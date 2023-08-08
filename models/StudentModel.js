var mongoose = require('mongoose');

//Schema: khai báo, định nghĩa cấu trúc của bảng (tên các cột và kiểu dữ liệu tương ứng)
var StudentSchema = mongoose.Schema(
    {
       name : String,
       dob : Date,
       gender : String,
       department : String,
       class : String,
       image : String,
       gpa : Number,
       studentYear : Number
    }
);

//'mobile' là tên bảng trong db
//'dien thoai' là description tự chọn tên

const StudentModel = mongoose.model('Student', StudentSchema, 'Student');
module.exports = StudentModel;