import React from 'react'

const Newsitem = (props) => {
    let{title,description,imageUrl,newsUrl,date,source,author} = props;
    return (
        <div className="my-3" style={{paddingLeft:"50px",paddingRight: "50px"}}>

            <div className="card">
               <div style={{display: 'flex',justifyContent: 'flex-end',position: 'absolute',right: '0'}}>
                      <span className="badge rounded-pill bg-danger">{source}</span>
                  </div>
                  <img src={imageUrl} className="card-img-top" alt="..." />
                  
                  
                <div className="card-body">
                  <h5 className="card-title">{title}...</h5>
                  <p className="card-text">{description}...</p>
                  <p className="card-text"><small className="text-muted">By {author} on { new Date(date).toGMTString()}</small></p>
                  <a href={newsUrl} target="_blank" rel="noreferrer" className="btn btn-dark">Read More</a>
                </div>
            </div>            
        </div>                      
    )
  
}

export default Newsitem
