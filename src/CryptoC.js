import axios from "axios"
import React, { useState } from "react"
import swal from 'sweetalert'

function CryptoC() {

    const [crypto, setCrypto] = useState('')
    const [name, setName] = useState('')
    const [img, setImg] = useState('')
    const [symbol, setSymbol] = useState('')
    const [link, setLink] = useState('')
    const [lkr, setLkr] = useState('')
    const [usd, setUsd] = useState('')
    const [desc, setDesc] = useState('')


    const handleClick = () => {

        if (crypto === "") {
            swal("Field Empty", "Please enter valid Crypto Currency Name", "error")
        } else {
            const url = "https://api.coingecko.com/api/v3/coins/" + crypto
            axios.get(url)
                .then(res => {
                    let resData = res.data
                    setImg(resData.image.large)
                    setName(resData.name)
                    setSymbol(resData.symbol)
                    setLink(resData.links.homepage[0])
                    setLkr("LKR: Rs. " + resData.market_data.current_price.lkr)
                    setUsd("USD: $" + resData.market_data.current_price.usd)

                    /*whatever html tag inside the descript show exactly as html tag in the view 
                    so we have to make html tags to show the content but JSON.stringify will convert data to string
                    whatever content coming from API */
                    setDesc(JSON.stringify(resData.description.en))
                })
                .catch((error) => {
					console.log("Error: ", error)
					swal("Invalid Name", "Please enter valid Crypto Currency Name", "error")
				}
				)
        }


    }

    function createMarkup() {
        //convert all the html tags as html tag
        //so the html tags not going to inside the page
        return { __html: desc };
    }

    return (
        <div>

            <nav className="navbar bg-light">
                <div className="container">
                    <span className="navbar-brand mb-0 h1">Crypto Currency</span>
                </div>
            </nav>

            <div className="container mt-4 justify-content-center">
                <div className="row">
                    <div className="col-5 mx-auto">
                        <input type={"text"} value={crypto} placeholder="Enter Crypto Currency" onChange={(e) => setCrypto(e.target.value)} className="form-control" />
                        <button onClick={handleClick} className="btn btn-primary mt-3">Search</button>
                    </div>
                </div>

            </div>

            <div className="container-fluid mt-5">
                <div className="row">
                    <div className="col-4 text-center">
                        <img src={img} width="150" alt="" />

                        <div className="h1 text-white" >{name}</div>

                        <div className="h4 text-white">{symbol}</div>

                        <div className="h4 "><a className="text-white link-secondary" href={link}>{link}</a></div>

                        <div className="h4 text-white">{lkr}</div>

                        <div className="h4 text-white">{usd}</div>
                    </div>
                    <div className="col-8 my-auto">
                        <div className="fs-6 pe-5">
                            <div dangerouslySetInnerHTML={createMarkup()}></div>
                        </div>
                    </div>
                </div>

            </div>
        </div >
    )
}

export default CryptoC