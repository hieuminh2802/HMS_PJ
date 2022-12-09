// import React from "react";
// import { Link } from "react-router-dom";
// import "../../Assets/frontend/css/errorpage.css";

// function Page404(){
//     return(
//         <div classNameName="error">
//             <main classNameName='container1'>
//                 <span classNameName='particle'>4</span>
//                 <span classNameName='particle'>4</span>
//                 <span classNameName='particle'>4</span>
//                 <span classNameName='particle'>4</span>
//                 <span classNameName='particle'>4</span>
//                 <span classNameName='particle'>4</span>
//                 <span classNameName='particle'>4</span>
//                 <span classNameName='particle'>4</span>
//                 <span classNameName='particle'>4</span>
//                 <span classNameName='particle'>4</span>
//                 <span classNameName='particle'>4</span>
//                 <span classNameName='particle'>4</span>
//                 <span classNameName='particle'>4</span>
//                 <span classNameName='particle'>4</span>
//                 <span classNameName='particle'>4</span>
//                 <span classNameName='particle'>4</span>
//                 <span classNameName='particle'>4</span>
//                 <span classNameName='particle'>4</span>
//                 <span classNameName='particle'>4</span>
//                 <span classNameName='particle'>4</span>
//                 <span classNameName='particle'>4</span>
//                 <span classNameName='particle'>4</span>
//                 <span classNameName='particle'>4</span>
//                 <span classNameName='particle'>4</span>
//                 <span classNameName='particle'>4</span>
//                 <span classNameName='particle'>4</span>
//                 <span classNameName='particle'>4</span>
//                 <span classNameName='particle'>4</span>
//                 <span classNameName='particle'>4</span>
//                 <span classNameName='particle'>4</span>
//                 <span classNameName='particle'>4</span>
//                 <span classNameName='particle'>4</span>
//                 <span classNameName='particle'>4</span>
//                 <span classNameName='particle'>4</span>
//                 <span classNameName='particle'>4</span>
//                 <span classNameName='particle'>4</span>
//                 <span classNameName='particle'>4</span>
//                 <span classNameName='particle'>4</span>
//                 <span classNameName='particle'>4</span>
//                 <span classNameName='particle'>4</span>
//                 <span classNameName='particle'>0</span>
//                 <span classNameName='particle'>0</span>
//                 <span classNameName='particle'>0</span>
//                 <span classNameName='particle'>0</span>
//                 <span classNameName='particle'>0</span>
//                 <span classNameName='particle'>0</span>
//                 <span classNameName='particle'>0</span>
//                 <span classNameName='particle'>0</span>
//                 <span classNameName='particle'>0</span>
//                 <span classNameName='particle'>0</span>
//                 <span classNameName='particle'>0</span>
//                 <span classNameName='particle'>0</span>
//                 <span classNameName='particle'>0</span>
//                 <span classNameName='particle'>0</span>
//                 <span classNameName='particle'>0</span>
//                 <span classNameName='particle'>0</span>
//                 <span classNameName='particle'>0</span>
//                 <span classNameName='particle'>0</span>
//                 <span classNameName='particle'>0</span>
//                 <span classNameName='particle'>0</span>
//                 <span classNameName='particle'>0</span>
//                 <span classNameName='particle'>0</span>
//                 <span classNameName='particle'>0</span>
//                 <span classNameName='particle'>0</span>
//                 <span classNameName='particle'>0</span>
//                 <span classNameName='particle'>0</span>
//                 <span classNameName='particle'>0</span>
//                 <span classNameName='particle'>0</span>
//                 <span classNameName='particle'>0</span>
//                 <span classNameName='particle'>0</span>
//                 <span classNameName='particle'>0</span>
//                 <span classNameName='particle'>0</span>
//                 <span classNameName='particle'>0</span>
//                 <span classNameName='particle'>0</span>
//                 <span classNameName='particle'>0</span>
//                 <span classNameName='particle'>0</span>
//                 <span classNameName='particle'>0</span>
//                 <span classNameName='particle'>0</span>
//                 <span classNameName='particle'>0</span>
//                 <span classNameName='particle'>0</span>
//                 <article classNameName='content'>
//                     <p>OOPs,</p>
//                     <p><strong>404</strong> Not Found</p>
//                     <p>
//                     <button><Link to={'/'} style={{ 'textDecoration': 'none' }} classNameName="text-dark fw-bold">Go Home</Link></button>
//                     </p>
//                 </article>
//                 </main>
//         </div>
//     );
// }
// export default Page404;

import React from "react";

function Page404()
{
    return(
        <div>
            <button type="button" className="btn btn-primary" data-bs-toggle="modal" data-bs-target="#exampleModal">
            Launch demo modal
            </button>

            <div className="modal fade" id="exampleModal" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
            <div className="modal-dialog">
                <div className="modal-content">
                <div className="modal-header">
                    <h1 className="modal-title fs-5" id="exampleModalLabel">Modal title</h1>
                    <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                </div>
                <div className="modal-body">
                    ...
                </div>
                <div className="modal-footer">
                    <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                    <button type="button" className="btn btn-primary">Save changes</button>
                </div>
                </div>
            </div>
            </div>
        </div>
    )
}
export default Page404;