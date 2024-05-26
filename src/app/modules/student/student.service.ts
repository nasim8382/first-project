import { TStudent } from "./student.interface";
import { Student as Student } from "./student.model";

const createStudentIntoDB = async (studentData: TStudent) => {
  if (await Student.isStudentExits(studentData.id)) {
    throw new Error("User already exists!");
  }

  // built in static method
  const result = await Student.create(studentData);

  // const student = new Student(studentData); // create an instance
  // built in instance method provided by mongoose
  // if (await student.isStudentExits(studentData.id)) {
  //   throw new Error("User already exists!");
  // }

  // const result = await student.save();

  return result;
};

const getAllStudentsFromDB = async () => {
  const result = await Student.find();
  return result;
};

const getSingleStudentFromDB = async (id: string) => {
  const result = await Student.findOne({ id });
  return result;
};

export const StudentServices = {
  createStudentIntoDB,
  getAllStudentsFromDB,
  getSingleStudentFromDB,
};
