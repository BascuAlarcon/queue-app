 
// HTML References
const lblDesktop = document.querySelector('h1');
const btnNew     = document.querySelector('button');
const lblTicket  = document.querySelector('small');
 
const searchParams = new URLSearchParams(window.location.search);
if(searchParams.has('Escritorio')){
    window.location = 'index.html';
    throw new Error('Desktop is required');
}

const desktop = searchParams.get('Escritorio');
lblDesktop.innerText = desktop;

const socket = io();

socket.on('connect', () => { 
    btnNew.disabled = false; 
});

socket.on('disconnect', () => { 
    btnNew.disabled = true;
}); 

socket.on('last-ticket', (last) => {
    // btnNewTicket.innerText = 'Ticket ' + last;
});

btnNew.addEventListener( 'click', () => {
 
    socket.emit('take-ticket', {desktop}, ({ok, ticket}) => {
        if(!ok){
            return;
        }
    });
    // socket.emit( 'next-ticket', null, ( ticket ) => {
    //     btnNewTicket.innerText = ticket;
    // });

});