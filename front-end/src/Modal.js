// import React from 'react'
// import { Button, Header, Icon, Modal } from 'semantic-ui-react'
// import { useHistory } from 'react-router-dom'
// function ShowModal({ table_id, handleRemoveTable, load }) {

//     if (window.confirm("Is this table ready to seat new guests? This cannot be undone.")) {
//         handleRemoveTable(table_id)
//     }
//     // const [open, setOpen] = React.useState(false)
//     // const history = useHistory()
//     // return (
//     //     <Modal
//     //         basic
//     //         onClose={() => setOpen(false)}
//     //         onOpen={() => setOpen(true)}
//     //         open={open}
//     //         size='small'
//     //         trigger={<Button data-table-id-finish={table_id}

//     //         >Finish</Button>}
//     //     >
//     //         <Header icon>
//     //             <Icon name='archive' />
//     //             Archive Old Messages
//     //         </Header>
//     //         <Modal.Content>
//     //             <p>
//     //                 Is this table ready to seat new guests? This cannot be undone.
//     //             </p>
//     //         </Modal.Content>
//     //         <Modal.Actions>
//     //             <Button basic color='red' inverted onClick={() => setOpen(false)}>
//     //                 <Icon name='remove' /> No
//     //             </Button>
//     //             <Button color='green' inverted onClick={() => {
//     //                 setOpen(false)
//     //                 handleRemoveTable(table_id)
//     //             }


//     //             }>
//     //                 <Icon name='checkmark' /> Ok
//     //             </Button>
//     //         </Modal.Actions>
//     //     </Modal>
//     // )
// }

// export default ShowModal