// import fs from "fs";
// import data from "../data/data.json";

// // ⛔️ CAN'T use fs here ⛔️

// const getServerSideProps = async () => {
//   // ✅ Can use fs here (runs only on the server)
//   console.log(fs);

//   fs.readFile("./data.json", "utf8", (err, data) => {
//     if (err) {
//       console.error(err);
//       return;
//     }
//   });

//   return {
//     props: { data },
//   };
// };

// export default getServerSideProps