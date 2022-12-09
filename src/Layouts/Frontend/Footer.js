import React from "react";
import { Link } from "react-router-dom";
import logo from "../../Assets/admin/img/logo3.png";
import { SiFacebook, SiGithub, SiGoogle, SiHomeadvisor, SiInstagram, SiLinkedin, SiMailchimp, SiPhonepe, SiTwitter } from "react-icons/si";
import { MdAttachEmail, MdHome, MdPhoneCallback } from "react-icons/md";

function Footer()
{
    return(
            <div className="container py-5">
                <div className="row ">
                <section className="d-flex justify-content-center justify-content-lg-between p-4 border-bottom">
                    <div className="me-5 d-none d-lg-block">
                        <span className="fw-bold">Get connected with us on social networks:</span>
                        </div>
                        <div>
                        <Link to="" style={{ textDecoration: 'none' }} className="me-4 text-reset">
                            <SiFacebook />
                        </Link>
                        <Link to="" style={{ textDecoration: 'none' }} className="me-4 text-reset">
                            < SiTwitter />
                        </Link>
                        <Link to="" style={{ textDecoration: 'none' }} className="me-4 text-reset">
                            < SiGoogle />
                        </Link>
                        <Link to="" style={{ textDecoration: 'none' }} className="me-4 text-reset">
                            < SiInstagram />
                        </Link>
                        <Link to="" style={{ textDecoration: 'none' }} className="me-4 text-reset">
                            < SiLinkedin />
                        </Link>
                        <Link to="" style={{ textDecoration: 'none' }} className="me-4 text-reset">
                            < SiGithub />
                        </Link>
                    </div>
                </section>
                <div className="col-12 col-md mt-5">
                    <Link className="navbar-brand text-uppercase fw-bold mb-4" to="" style={{ textDecoration: 'none' }}>
                        <img src={logo} height="70px" width="70px" />
                    </Link>
                </div>
                <div className="col-6 col-md mt-5">
                    <h5 className="text-uppercase fw-bold mb-4">Policy</h5>
                    <ul className="list-unstyled text-small ">
                        <li><Link className="link-secondary text-black" to="" style={{ textDecoration: 'none' }}>Introduce about the company</Link></li>
                        <li><Link className="link-secondary text-black" to="" style={{ textDecoration: 'none' }}>Purchase FAQ</Link></li>
                        <li><Link className="link-secondary text-black" to="" style={{ textDecoration: 'none' }}>Privacy Policy</Link></li>
                        <li><Link className="link-secondary text-black" to="" style={{ textDecoration: 'none' }}>Operational Regulations</Link></li>
                        <li><Link className="link-secondary text-black" to="" style={{ textDecoration: 'none' }}>Check e-invoices</Link></li>
                        <li><Link className="link-secondary text-black" to="" style={{ textDecoration: 'none' }}>Look up warranty information</Link></li>
                    </ul>
                </div>
                <div className="col-6 col-md mt-5">
                    <h5 className="text-uppercase fw-bold mb-4">Recruit</h5>
                    <ul className="list-unstyled text-small">
                        <li><Link className="link-secondary text-black" to="" style={{ textDecoration: 'none' }}>Recruitment</Link></li>
                        <li><Link className="link-secondary text-black" to="" style={{ textDecoration: 'none' }}>Promotion information</Link></li>
                        <li><Link className="link-secondary text-black" to="" style={{ textDecoration: 'none' }}>Guide to buying online</Link></li>
                        <li><Link className="link-secondary text-black" to="" style={{ textDecoration: 'none' }}>Installment purchase guide</Link></li>
                        <li><Link className="link-secondary text-black" to="" style={{ textDecoration: 'none' }}>Installment Policy</Link></li>
                    </ul>
                </div>
                <div className="col-6 col-md mt-5">
                    <h5 className="text-uppercase fw-bold mb-4">Shop</h5>
                    <ul className="list-unstyled text-small">
                        <li><Link className="link-secondary text-black" to="" style={{ textDecoration: 'none' }}>Shop system</Link></li>
                        <li><Link className="link-secondary text-black" to="" style={{ textDecoration: 'none' }}>Warranty system</Link></li>
                        <li><Link className="link-secondary text-black" to="" style={{ textDecoration: 'none' }}>Business sales</Link></li>
                        <li><Link className="link-secondary text-black" to="" style={{ textDecoration: 'none' }}>Introducing the exchange machine</Link></li>
                        <li><Link className="link-secondary text-black" to="" style={{ textDecoration: 'none' }}>Return Policy</Link></li>
                    </ul>
                </div>
                <div className="col-6 col-md mt-5">
                    <h5 className="text-uppercase fw-bold mb-4">Contact</h5>
                    <ul className="list-unstyled text-small">
                        <li><Link className="link-secondary text-black" to="" style={{ textDecoration: 'none' }}>< MdHome /> Đà Nẵng, VN</Link></li>
                        <li><Link className="link-secondary text-black" to="" style={{ textDecoration: 'none' }}>< MdAttachEmail /> nmh@gmail.com</Link></li>
                        <li><Link className="link-secondary text-black" to="" style={{ textDecoration: 'none' }}>< MdPhoneCallback /> + 0796 265 109</Link></li>
                        <li><Link className="link-secondary text-black" to="" style={{ textDecoration: 'none' }}>< MdPhoneCallback /> + 0788 656 804</Link></li>
                    </ul>
                </div>
            </div>
        </div>
    )
}
export default Footer;