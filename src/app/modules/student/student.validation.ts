import { z } from "zod";

// UserName Schema
const userNameValidationSchema = z.object({
  firstName: z
    .string()
    .trim()
    .min(1, "First Name is required")
    .max(20, "First Name can not be more than 20 characters")
    .refine(
      (value) => {
        const firstNameStr = value.charAt(0).toUpperCase() + value.slice(1);
        return firstNameStr === value;
      },
      {
        message: "{VALUE} is not in capitalize format",
      }
    ),
  middleName: z.string().trim().optional(),
  lastName: z
    .string()
    .trim()
    .min(1, "Last Name is required")
    .refine((value) => /^[A-Za-z]+$/.test(value), {
      message: "{VALUE} is not valid",
    }),
});

// Guardian Schema
const guardianValidationSchema = z.object({
  fatherName: z.string().trim().min(1, "Father's Name is required"),
  fatherOccupation: z.string().trim().min(1, "Father's Occupation is required"),
  fatherPhoneNo: z.string().trim().min(1, "Father's Phone Number is required"),
  motherName: z.string().trim().min(1, "Mother's Name is required"),
  motherOccupation: z.string().trim().min(1, "Mother's Occupation is required"),
  motherPhoneNo: z.string().trim().min(1, "Mother's Phone Number is required"),
});

// Local Guardian Schema
const localGuardianValidationSchema = z.object({
  name: z.string().trim().min(1, "Local Guardian's Name is required"),
  occupation: z
    .string()
    .trim()
    .min(1, "Local Guardian's Occupation is required"),
  phoneNo: z
    .string()
    .trim()
    .min(1, "Local Guardian's Phone Number is required"),
  address: z.string().trim().min(1, "Local Guardian's Address is required"),
});

// Student Schema
const studentValidationSchema = z.object({
  id: z.string().trim().min(1, "Student ID is required"),
  password: z
    .string()
    .trim()
    .min(1, "Password is required")
    .max(20, "Password can not be more than 20 characters"),
  name: userNameValidationSchema,
  gender: z.enum(["male", "female"], {
    errorMap: () => ({ message: "{VALUE} is not valid" }),
  }),
  dateOfBirth: z.string().optional(),
  email: z
    .string()
    .trim()
    .min(1, "Email is required")
    .email("{VALUE} is not a valid email"),
  phoneNo: z
    .string()
    .trim()
    .min(1, "Phone number is required")
    .max(11, "Phone No can not be more than 11 characters"),
  emergencyPhoneNo: z
    .string()
    .trim()
    .min(1, "Emergency phone number is required"),
  bloodGroup: z.enum(["A+", "A-", "B+", "B-", "AB+", "AB-", "O+", "O-"], {
    errorMap: () => ({ message: "Blood group is required" }),
  }),
  presentAddress: z.string().trim().min(1, "Present address is required"),
  permanentAddress: z.string().trim().min(1, "Permanent address is required"),
  guardian: guardianValidationSchema,
  localGuardian: localGuardianValidationSchema,
  profileImg: z.string().trim().optional(),
  isActive: z.enum(["active", "blocked"]).default("active"),
  isDeleted: z.boolean().default(false),
});

export default studentValidationSchema;