// const notifyCustomer = () =>{
//     console.log("Calling customer");
// }

// const order = (item, callback) =>{
//     console.log(`preparing your ${item}`);
//     setTimeout(() => {
//         console.log(`your ${item} is prepared`);
//         callback();
//     }, 2000);
// }

// order("Burger", notifyCustomer);




// function sayHello(){
//     console.log("Hey I am Prince");
// }

// setTimeout(sayHello, 2000);


function fetchData() {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      const success = true; // Simulate a successful or failed operation
      if (success) {
        resolve("Data fetched successfully!");
      } else {
        reject("Error fetching data.");
      }
    }, 2000); // Simulate a 2-second delay
  });
}

fetchData()
  .then((message) => {
    console.log(message); // "Data fetched successfully!"
  })
  .catch((error) => {
    console.error(error); // "Error fetching data."
  });