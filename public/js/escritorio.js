 
// HTML References
const lblescritorio = document.querySelector('h1');
const btnNew     = document.querySelector('button');
const lblTicket  = document.querySelector('small');
const divAlert  = document.querySelector('.alert');
const lblPendientes  = document.querySelector('#lblPendientes');

const searchParams = new URLSearchParams(window.location.search);
if(!searchParams.has('escritorio')){ 
    window.location = 'index.html';
    throw new Error('escritorio is required');
} 

const escritorio = searchParams.get('escritorio');
lblescritorio.innerText = escritorio;
divAlert.style.display = 'none';
 

const socket = io();

socket.on('connect', () => { 
    btnNew.disabled = false; 
});

socket.on('disconnect', () => { 
    btnNew.disabled = true;
}); 

socket.on('tickets-pending', (pending) => {
    lblPendientes.innerText = pending;
});

btnNew.addEventListener( 'click', () => {
 
    socket.emit('take-ticket', {escritorio}, ({ok, ticket, msg}) => {  
        if(!ok){
            lblTicket.innerText = 'Nadie';
            return divAlert.style.display = '';
        }
        
        lblTicket.innerText = 'Ticket ' + ticket.number
    });
    // socket.emit( 'next-ticket', null, ( ticket ) => {
    //     btnNewTicket.innerText = ticket;
    // });

});