const TicketControl = require("../models/ticket-control");

const ticketControl = new TicketControl();

const socketController = (socket) => {  

    socket.emit('last-ticket', ticketControl.last)
    socket.emit('tickets-state', ticketControl.last4) 
    socket.emit('tickets-pending', ticketControl.tickets.length);

    socket.on('next-ticket', ( payload, callback ) => {
         
        const next = ticketControl.next();
        callback(next);
        socket.broadcast.emit('tickets-pending', ticketControl.tickets.length);
    })

    socket.on('take-ticket', ({escritorio}, callback) => { 
        if(!escritorio){
            return callback({
                ok: false,
                msg: 'escritorio is required'
            });
        } 
        
        const ticket = ticketControl.ticketAttend(escritorio);

        socket.broadcast.emit('tickets-state', ticketControl.last4)
        socket.emit('tickets-pending', ticketControl.tickets.length);
        socket.broadcast.emit('tickets-pending', ticketControl.tickets.length);

        if(!ticket){
            callback({
                ok: false,
                msg: 'There is not more tickets'
            });
        }else{
            callback({
                ok: true,
                ticket
            })
        }
    });

}



module.exports = {
    socketController
}

