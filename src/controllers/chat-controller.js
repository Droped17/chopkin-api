// model ChatRoom {
//     id             Int      @id @default(autoincrement())
//     roomIdBySocket String
//     adminId        String
//     admin          Admin    @relation(fields: [adminId], references: [id])
//     customerId     String
//     customer       Customer @relation(fields: [customerId], references: [id])
//     bookingId      String?
//     booking        Booking? @relation(fields: [bookingId], references: [id])
//   }