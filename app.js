// Task1: initiate app and run server at 3000

const path=require('path');
app.use(express.static(path.join(__dirname+'/dist/FrontEnd')));
// Task2: create mongoDB connection 
const mongoose = require('mongoose');
require('dotenv').config();
const mongoURL = process.env.MONGO_URL || 'mongodb+srv://anand224037_db_user:C9LteNQILLtwwMAi@cluster0.mxbhdpq.mongodb.net/?appName=Cluster0';
mongoose.connect(mongoURL, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log('MongoDB connected successfully'))
  .catch(err => console.error('MongoDB connection error:', err));
const employeeSchema = new mongoose.Schema({
  name: { type: String, required: true },
  location: { type: String, required: true },
  position: { type: String, required: true },
  salary: { type: String, required: true }
}, { timestamps: true });
const Employee = mongoose.model('Employee', employeeSchema);

//Task 2 : write api with error handling and appropriate api mentioned in the TODO below







//TODO: get data from db  using api '/api/employeelist'
app.get('/api/employeelist', async (req, res) => {
  try {
    const employees = await Employee.find();
    res.status(200).json(employees);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching employees', error: error.message });
  }
});



//TODO: get single data from db  using api '/api/employeelist/:id'
app.get('/api/employeelist/:id', async (req, res) => {
  try {
    const employee = await Employee.findById(req.params.id);
    if (!employee) return res.status(404).json({ message: 'Employee not found' });
    res.status(200).json(employee);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching employee', error: error.message });
  }
});




//TODO: send data from db using api '/api/employeelist'
//Request body format:{name:'',location:'',position:'',salary:''}
app.post('/api/employeelist', async (req, res) => {
  try {
    const { name, location, position, salary } = req.body;
    if (!name || !location || !position || !salary)
      return res.status(400).json({ message: 'All fields are required' });
    const newEmployee = new Employee({ name, location, position, salary });
    const savedEmployee = await newEmployee.save();
    res.status(201).json({ message: 'Employee added successfully', employee: savedEmployee });
  } catch (error) {
    res.status(500).json({ message: 'Error adding employee', error: error.message });
  }
});





//TODO: delete a employee data from db by using api '/api/employeelist/:id'
app.delete('/api/employeelist/:id', async (req, res) => {
  try {
    const deletedEmployee = await Employee.findByIdAndDelete(req.params.id);
    if (!deletedEmployee) return res.status(404).json({ message: 'Employee not found' });
    res.status(200).json({ message: 'Employee deleted successfully', employee: deletedEmployee });
  } catch (error) {
    res.status(500).json({ message: 'Error deleting employee', error: error.message });
  }
});




//TODO: Update  a employee data from db by using api '/api/employeelist'
//Request body format:{name:'',location:'',position:'',salary:''}
app.put('/api/employeelist', async (req, res) => {
  try {
    const { _id, name, location, position, salary } = req.body;
    if (!_id) return res.status(400).json({ message: 'Employee ID is required' });
    const updatedEmployee = await Employee.findByIdAndUpdate(
      _id, { name, location, position, salary }, { new: true, runValidators: true }
    );
    if (!updatedEmployee) return res.status(404).json({ message: 'Employee not found' });
    res.status(200).json({ message: 'Employee updated successfully', employee: updatedEmployee });
  } catch (error) {
    res.status(500).json({ message: 'Error updating employee', error: error.message });
  }
});

//! dont delete this code. it connects the front end file.
app.get('/*', function (req, res) {
    res.sendFile(path.join(__dirname + '/dist/Frontend/index.html'));
});




