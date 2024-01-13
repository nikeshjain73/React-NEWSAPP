import React, {useEffect,useState} from 'react'
import Newsitem from './Newsitem'
import notfound from './404notfound.png'
import Spinner from './Spinner'
import PropTypes from 'prop-types'
import InfiniteScroll from "react-infinite-scroll-component";


const News = (props) => {
   const [articles, setArticles] = useState([])
   const [loading, setLoading ]= useState(true)
   const [page, setPage] = useState(1)
   const [totalResults, setTotalResults] = useState(0)
        // document.title = `News Begin ${cap(this.props.category)}`;

    
    const updateNews = async() => {
       props.setProgress(20)
        const url = `https://newsapi.org/v2/top-headlines?country=${props.country}&category=${props.category}&apiKey=ef3d549d2f1f4ca8a8f9c4e2f6317ec6&page=${page}&pageSize=${props.pageSize}`;
        // this.setState({loading: true})
        setLoading(true)
        let data = await fetch(url);
       props.setProgress(50)
        let parseddata = await data.json();
       props.setProgress(80)
        console.log(parseddata)
        setArticles(parseddata.articles);
        setTotalResults(parseddata.setTotalResults)
        setLoading(false)
        // this.setState({
        //     articles: parseddata.articles,
        //     totalResults: parseddata.totalResults,
        //     loading: false
        // })
       props.setProgress(100)
    }
    
    useEffect(() => {
        updateNews();
    }, [])
    
    // async componentDidMount() {
       
    // }

    

    const fetchMoreData = async () => {

        //The setState method in React is asynchronous, but it does not return a Promise. Therefore, using await with this.setState does not have the desired effect because setState does not actually pause execution of the function.
        //The setState function also has a second argument which is a callback function that gets executed after the state has been updated. If you want to perform an action immediately after updating the state, you should use this callback function.

/*        this.setState(prevState => ({page: prevState.page + 1}), async () => {
            // Perform any action here after the state has been updated
            const url = `https://newsapi.org/v2/top-headlines?country=${props.country}&category=${props.category}&apiKey=ef3d549d2f1f4ca8a8f9c4e2f6317ec6&page=${this.state.page}&pageSize=${props.pageSize}`;
            this.setState({loading: true})
            let data = await fetch(url);
            let parseddata = await data.json();
            console.log(parseddata)
            this.setState({
                articles: this.state.articles.concat(parseddata.articles),
                totalResults: parseddata.totalResults,
                loading: false
            })
        });*/

        //either you can use this code
        const nxtpage = page + 1;
        const url = `https://newsapi.org/v2/top-headlines?country=${props.country}&category=${props.category}&apiKey=ef3d549d2f1f4ca8a8f9c4e2f6317ec6&page=${nxtpage}&pageSize=${props.pageSize}`;
        // this.setState({loading: true})
        setLoading(true)
        let data = await fetch(url);
        let parseddata = await data.json();
        console.log(parseddata)
        setArticles(articles.concat(parseddata.articles))
        setTotalResults(parseddata.totalResults)
        setLoading(false)
        setPage(nxtpage)
        // this.setState({
        //     articles: articles.concat(parseddata.articles),
        //     totalResults: parseddata.totalResults,
        //     loading: false,
        //     page: page
        // })
    };
   
    document.title =`News Begin ${(props.category)}`

        return (
            <>
               <h1 className="text-center" style={{marginTop: '60px', marginBottom: '40px'}}>News Begin Top <strong>{(props.category.charAt(0).toUpperCase() + props.category.slice(1))}</strong> Headlines</h1>

                {loading && <Spinner/>}
                <InfiniteScroll
                    dataLength={articles.length}
                    next={fetchMoreData}
                    hasMore={articles.length !== totalResults}
                    loader={<Spinner/>}
                >
                    <div className="contanier" style={{overflow: 'hidden'}}>
                        <div className="row">
                            {articles.map((element, index) => {
                                console.log(element)
                                return <div className="col-md-4" key={index}>
                                    <Newsitem title={element.title ? element.title.slice(0, 50) : ""}
                                              source={element.source.name}
                                              author={element.author ? element.author : "Unknown"}
                                              date={element.publishedAt}
                                              description={element.description ? element.description.slice(0, 88) : "not Found"}
                                              imageUrl={element.urlToImage ? element.urlToImage : notfound}
                                              newsUrl={element.url}/>
                                </div>
                            })}
                        </div>
                    </div>
                </InfiniteScroll>

            </>
        )
    
}
News.defaultProps = {
    country: 'in',
    pageSize: 8,
    category: 'genral'
}

News.propTypes = {
    country: PropTypes.string,
    pageSize: PropTypes.number,
    category: PropTypes.string

}
export default News
