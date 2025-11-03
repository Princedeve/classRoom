const notifyCustomer = () =>{
    console.log("Calling customer");
}

const order = (item, callback) =>{
    console.log(`preparing your ${item}`);
    setTimeout(() => {
        console.log(`your ${item} is prepared`);
        callback();
    }, 2000);
}

order("Burger", notifyCustomer);




function sayHello(){
    console.log("Hey I am Prince");
}

setTimeout(sayHello, 2000);