const callback = () =>{
    console.log("calling");
}

const order = (item, callback) =>{
    console.log(`your ${item} is preparing`);
    setTimeout(() => {
        console.log(`your ${item} is ready`);
        callback();
    }, 2000);
}

order("burger", callback);