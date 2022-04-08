import React, { Component } from 'react'
import Loading from './Loading';
import NewsItem from './NewsItem';
import InfiniteScroll from "react-infinite-scroll-component";

export class News extends Component {

  capitalizeFirstLetter(string) {
    return string.charAt(0).toUpperCase() + string.slice(1);
  }

  constructor(props){
    super(props);
    this.state = {
      articles: [],
      page: 1,
      loading: true,
      totalResults: 0,
    };
    document.title = `${this.props.category} - NewsMonkey`;
  }

  async updateNews(){
    this.props.setProgress(0);
    const url = `https://newsapi.org/v2/top-headlines?country=us&pageSize=${this.props.pageSize}&category=${this.props.category}&apiKey=3b905997ef524623b7ec40240bb29666&page=${this.state.page}`;
    this.props.setProgress(10);
    let data = await fetch(url);
    this.props.setProgress(30);
    let parsedData = await data.json();
    this.props.setProgress(70);
    this.setState({articles: parsedData.articles, totalResults: parsedData.totalResults, loading: false});
    this.props.setProgress(100);
  }

  async componentDidMount(){
    this.updateNews();
  }

  fetchMoreData = async () => {

    const url = `https://newsapi.org/v2/top-headlines?country=us&pageSize=${this.props.pageSize}&category=${this.props.category}&apiKey=3b905997ef524623b7ec40240bb29666&page=${this.state.page + 1}`;
    this.setState({loading: true});
    let data = await fetch(url);
    let parsedData = await data.json();
    this.setState({
      articles: this.state.articles.concat(parsedData.articles), 
      totalResults: parsedData.totalResults, 
      loading: false,
      page: this.state.page + 1,

    });
  };

  // handlePrevClicK = async () => {
  //   this.setState({
  //     page : this.state.page - 1,
  //   }, () => this.updateNews());
    
  // }

  // handleNextClicK = async () => {
  //   this.setState({
  //     page : this.state.page + 1,
  //   }, () => this.updateNews());
    
  // }

  render() {
    return (
      <>
          <h2 className='text-center my-3'>NewsMonkey - Top News from {this.capitalizeFirstLetter(this.props.category)}</h2>
          {this.state.loading && <Loading />}

          <InfiniteScroll
            dataLength={this.state.articles.length}
            next={this.fetchMoreData}
            hasMore={this.state.articles.length !== this.state.totalResults}
            loader={ <Loading />}
          >
            <div className="container">
              <div className="row">
                {this.state.articles.map((element) => { 
                  return <div className="col-md-4" key={element.url}>
                            <NewsItem title={element.title} description={element.description} imageUrl = {element.urlToImage} newsUrl = {element.url} author={element.author} date={element.publishedAt} source={element.source.name} />   
                          </div>
                })}
                  
              </div>

            </div>
          </InfiniteScroll>
      </>
    )
  }
}

export default News