const bcrypt = require('bcrypt');
const { User } = require('./app');

const signup = async (req, res) => {
    const { email, password, role } = req.body;
    const hashedPassword = await bcrypt.hash(password, 10);
  
    try {
      const user = await User.create({ email, password: hashedPassword, role });
      res.status(201).json(user);
    } catch (error) {
      res.status(400).json({ message: error.message });
    }
  }

const login = async (req, res) => {
    const { email, password } = req.body;
  
    try {
      const user = await User.findOne({ where: { email } });
      if (!user) {
        return res.status(401).json({ message: 'Authentication failed' });
      }
  
      const isPasswordValid = await bcrypt.compare(password, user.password);
      if (!isPasswordValid) {
        return res.status(401).json({ message: 'Authentication failed' });
      }
  
      const token = jwt.sign({ userId: user.id, role: user.role }, 'secret-key');
      const {email, roleId } = user;
      res.json({ token, email, roleId });
    } catch (error) {
      res.status(400).json({ message: error.message });
    }
  }

  module.exports = {
    signup,
    login,
  };