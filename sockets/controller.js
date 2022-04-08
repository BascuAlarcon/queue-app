const TicketControl = require("../models/ticket-control");

const ticketControl = new TicketControl();

const socketController = (socket) => {  

    socket.emit('last-ticket', ticketControl.last)

    socket.on('next-ticket', ( payload, callback ) => {
         
        const next = ticketControl.next();
        callback(next);

    })

    socket.on('take-ticket', ({desktop}, callback) => {
        if(desktop){
            return callback({
                ok: false,
                msg: 'Desktop is required'
            });
        }

        const ticket = ticketControl.ticketAttend(desktop);
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

