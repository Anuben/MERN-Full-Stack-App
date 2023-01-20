const Student = require('mongoose').model('Student');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const config = require('../../config/config');
const jwtExpirySeconds = 300;
const jwtKey =config.secretKey;


const getErrorMessage = function(err) {
	var message = '';

	if (err.code) {
		switch (err.code) {

			case 11000:
			case 11001:
				message = 'Username already exists';
				break;

			default:
				message = 'Something went wrong';
		}
	} else {

		for (const errName in err.errors) {
			if (err.errors[errName].message) message = err.errors[errName].message;
		}
	}

	return message;
};

exports.create = function (req, res, next) {

    var student = new Student(req.body); 
    console.log("body: " + req.body.username);


    student.save(function (err) {
        if (err) {

            return next(err);
        } else {
          
            res.json(student);
            
        }
    });
};

exports.list = function (req, res, next) {

    Student.find({}, function (err, students) {
        if (err) {
            return next(err);
        } else {
            res.json(students);
        }
    });
};

exports.read = function(req, res) {
	
	res.json(req.student);
};

exports.studentByID = function (req, res, next, id) {
	
	Student.findOne({
        _id: id
	}, (err, student) => {
		if (err) {
			
			return next(err);
		} else {
			
            req.student = student;
            console.log(student);
			
			next();
		}
	});
};

exports.update = function(req, res, next) {
    console.log(req.body);
    Student.findByIdAndUpdate(req.student.id, req.body, function (err, student) {
      if (err) {
        console.log(err);
        return next(err);
      }
      res.json(student);
    });
};

exports.delete = function(req, res, next) {
    Student.findByIdAndRemove(req.student.id, req.body, function (err, student) {
      if (err) return next(err);
      res.json(student);
    });
};

exports.authenticate = function(req, res, next) {
	
	console.log(req.body)
	const username = req.body.auth.username;
	const password  = req.body.auth.password;
	console.log(password)
	console.log(username)
	
	Student.findOne({username: username}, (err, student) => {
			if (err) {
				return next(err);
			} else {
			console.log(student)
				
			if(bcrypt.compareSync(password, student.password)) {
				
				const token = jwt.sign({ id: student._id, username: student.username }, jwtKey, 
					{algorithm: 'HS256', expiresIn: jwtExpirySeconds });
				console.log('token:', token)

				res.cookie('token', token, { maxAge: jwtExpirySeconds * 1000,httpOnly: true});
				res.status(200).send({ screen: student.username });
				
				
				req.student=student;
				
				next()
			} else {
				res.json({status:"error", message: "Invalid username/password!!!",
				data:null});
			}
			
		}
		
	});
};

exports.welcome = (req, res) => {
	
	const token = req.cookies.token
	console.log(token)
	
	if (!token) {
	  return res.status(401).end()
	}
  
	var payload;
	try {
	 
	  payload = jwt.verify(token, jwtKey)
	} catch (e) {
	  if (e instanceof jwt.JsonWebTokenError) {
		
		return res.status(401).end()
	  }

	  return res.status(400).end()
	}
  
	
	res.send(`${payload.username}`)
 };

exports.signout = (req, res) => {
	res.clearCookie("token")
	return res.status('200').json({message: "signed out"})
	
}

exports.isSignedIn = (req, res) => {
	
	const token = req.cookies.token
	console.log(token)
	
	if (!token) {
	  return res.send({ screen: 'auth' }).end();
	}
	var payload;
	try {
	
	  payload = jwt.verify(token, jwtKey)
	} catch (e) {
	  if (e instanceof jwt.JsonWebTokenError) {

		return res.status(401).end()
	  }
	
	  return res.status(400).end()
	}
  
	
	res.status(200).send({ screen: payload.username });
}


exports.requiresLogin = function (req, res, next) {

	const token = req.cookies.token
	console.log(token)

	if (!token) {
	  return res.send({ screen: 'auth' }).end();
	}
	var payload;
	try {
	
	  payload = jwt.verify(token, jwtKey)
	  console.log('in requiresLogin - payload:',payload)
	  req.id = payload.id;
	} catch (e) {
	  if (e instanceof jwt.JsonWebTokenError) {
		
		return res.status(401).end()
	  }

	  return res.status(400).end()
	}
	
    next();
};