import React from 'react'

const HowToSpend = ({displayedInformation}) => {
    return (
        <div className="container child">
            <div className="card" style={{ width: ' 18rem' }}>
                {displayedInformation.map(line => (
                <div className="card-body">
                    <h5 className="card-title">Card title</h5>
                    <h6 className="card-subtitle mb-2 text-muted">Card subtitle</h6>
                    <p className="card-text">{line}</p>
                    <p>Card Link</p>
                    {/* <a href="#" class="card-link">Card link</a>
                    <a href="#" class="card-link">Another link</a> */}
                </div>
                ))
                }
            </div>
            <div className="card" style={{ width: ' 18rem' }}>
                <div className="card-body">
                    <h5 className="card-title">Card title</h5>
                    <h6 className="card-subtitle mb-2 text-muted">Card subtitle</h6>
                    <p className="card-text">Some quick example text to build on the card title and make up the bulk of the card's content.</p>
                    <p>Card Link</p>
                    {/* <a href="#" class="card-link">Card link</a>
                    <a href="#" class="card-link">Another link</a> */}
                </div>
            </div>

        </div>
    )
}

export default HowToSpend
