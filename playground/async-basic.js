console.log('Starting app');

setTimeout(() => {
  console.log('Inisde of callback');
}, 2000);

setTimeout(() =>{
  console.log("second timeout");
},0);

console.log('Finishing up');
