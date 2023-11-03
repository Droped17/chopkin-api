**_ status _**
0 = pending,
1 = success,
2 = canceled

**_ env _**
DATABASE_URL=
PORT=
CLOUDINARY_NAME=
CLOUDINARY_API_KEY=
CLOUDINAR_API_SECRET=

**_ GET RESTAURANT _**
GET http://localhost:8888/restaurant/all => GET ALL RESTAURANTS
GET http://localhost:8888/restaurant/:resId => GET RESTAURANT BY ID FOR RESTAURANT PAGE
GET http://localhost:8888/restaurant/resByCat/:catIndex => GET RESTAURANTS BY CATEGORY
GET http://localhost:8888/restaurant/resByNation/:nationIndex => GET RESTAURANTS BY NATIONALITY

**_ UPDATE RESTAURANT STATUS _**
PATCH http://localhost:8888/updateStatus/:resId" => UPDATE RESTAURANT STATUS

**_ CREATE RESTAURANT EDIT PENDING _**
ยิง 2 pathตามลำดับ
POST http://localhost:8888/updateStatus/:resId/edit"// CREATE EDIT PENDING
ชื่อคีย์ body ให้ใช้เป็น "info"
upload.array("image") เวลาส่งรูปร้านอาหารให้ส่งมาชื่อคีย์นี้

PATCH http://localhost:8888/createProfileImgPending/:pendingId"
upload.single("profileImg") รูปโปรไฟล์ส่งมาคีย์นี้
