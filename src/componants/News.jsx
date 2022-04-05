import React, { Component } from 'react'
import Loading from './Loading';
import NewsItem from './NewsItem'

export class News extends Component {

  constructor(){
    super();
    this.state = {
      articles: [],
      page: 1,
      loading: false,
      totalResults: 1,
    };
  }

  async componentDidMount(){
    this.setState({loading: true});
    let url = `https://newsapi.org/v2/top-headlines?country=us&pageSize=${this.props.pageSize}&category=${this.props.category}&apiKey=3b905997ef524623b7ec40240bb29666&page=${this.state.page}`;
    let data = await fetch(url);
    let parsedData = await data.json();
    this.setState({articles: parsedData.articles, totalResults: parsedData.totalResults});
    this.setState({loading: false});
  }

  handlePrevClicK = async () => {
    console.log(this.state.page);
    this.setState({loading: true});
    console.log(this.state.page);
    let url = `https://newsapi.org/v2/top-headlines?country=us&pageSize=${this.props.pageSize}&category=${this.props.category}&apiKey=3b905997ef524623b7ec40240bb29666&page=${this.state.page-1}`;
    let data = await fetch(url);
    let parsedData = await data.json();
    this.setState({
      page: this.state.page - 1, 
      articles: parsedData.articles, 
      totalResults: parsedData.totalResults
    });
    this.setState({loading: false});
  }

  handleNextClicK = async () => {
    console.log(this.state.page);
    this.setState({loading: true});
    console.log(this.state.page);
    let url = `https://newsapi.org/v2/top-headlines?country=us&pageSize=${this.props.pageSize}&category=${this.props.category}&apiKey=3b905997ef524623b7ec40240bb29666&page=${this.state.page+1}`;
    let data = await fetch(url);
    let parsedData = await data.json();
    this.setState({
      page: this.state.page + 1, 
      articles: parsedData.articles, 
      totalResults: parsedData.totalResults
    });
    this.setState({loading: false});
  }

  render() {
    return (
      <div className='container my-3'>
          <h2 className='text-center'>NewsMonkey - Top News</h2>
          {this.state.loading && <Loading />}
          <div className="row">
            {this.state.articles.map((element) => { 
              return <div className="col-md-4" key={element.url}>
                        <NewsItem title={element.title} description={element.description} imageUrl = {element.urlToImage} newsUrl = {element.url} author={element.author} date={element.publishedAt} source={element.source.name} />   
                      </div>
            })}
              
          </div>

          <button disabled={this.state.page <= 1} type="button" className="btn btn-dark float-start" onClick={this.handlePrevClicK}>Prev</button>
          <button disabled={this.state.page + 1 > Math.ceil(this.state.totalResults/20)} type="button" className="btn btn-dark float-end" onClick={this.handleNextClicK}>Next</button>
      </div>
    )
  }
}

export default News