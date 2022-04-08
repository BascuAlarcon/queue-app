
// HTML References

const btnNewTicket =  document.querySelector('#lblNuevoTicket')
const btnCreate = document.querySelector('button')

const socket = io();


socket.on('connect', () => { 
    btnCreate.disabled = false; 
});

socket.on('disconnect', () => { 
    btnCreate.disabled = true;
}); 

socket.on('last-ticket', (last) => {
    btnNewTicket.innerText = 'Ticket ' + last;
});

btnCreate.addEventListener( 'click', () => {
 
    socket.emit( 'next-ticket', null, ( ticket ) => {
        btnNewTicket.innerText = ticket;
    });

});