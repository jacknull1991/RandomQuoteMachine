import React from 'react';
import './QuoteBox.css';
import TextSpan from './TextSpan';
import Button from './Button';
import { connect } from 'react-redux';
import { getQuote } from '../redux/actions'; 

const QUOTE_URL = "https://thesimpsonsquoteapi.glitch.me/quotes";
const colors = ["#FA5E5D", "#27ae44", "#64D0A0", "#1545C1", "#7BB816", "#9050DE", "#C0894F", "#5B7081", "#5B87B1", "#E66E17"];

class QuoteBox extends React.Component {
    constructor(props) {
        super(props);

        this.handleNewQuote = this.handleNewQuote.bind(this);
        this.copyToClipboad = this.copyToClipboad.bind(this);
    }

    componentDidMount() {
        fetch(QUOTE_URL).then((response) => {
            return response.json();
        }).then((data) => {
            this.props.getQuote(data);
        }).catch((err) => {
            alert(err.message);
        });
    }

    copyToClipboad(event) {
        event.preventDefault();
        navigator.clipboard.writeText(this.props.quote).then(function(){
            alert("Quote copied to clipboard.");
        }, function() {
            alert("Failed to copy quote to clipboard.");
        });
    }

    handleNewQuote(event) {
        event.preventDefault();
        let quoteText = document.getElementsByClassName("quote-text")[0];
        let authorText = document.getElementsByClassName("quote-author")[0];
        quoteText.style.opacity = 0;
        authorText.style.opacity = 0;

        // get new quote
        fetch(QUOTE_URL).then((response) => {
            return response.json();
        }).then((data) => {
            this.props.getQuote(data);
            quoteText.style.opacity = 1;
            authorText.style.opacity = 1;
        }).catch((err) => {
            alert(err.message);
        });
        // change theme
        const len = colors.length;
        let colorIndex = Math.floor(Math.random() * len);
        document.documentElement.style.setProperty("--mainColor", colors[colorIndex]);
    }

    render() {
        return (
            <div className="quote-box">
                <div className="quote-text">
                    <i className="fa fa-quote-left"></i>
                    &nbsp;<TextSpan id="text" text={this.props.quote}/>
                </div>
                <div className="quote-author">
                    - <TextSpan id="author" text={this.props.author} />
                </div>
                <div className="btn-group">
                    <Button href="#" text="Copy Text" onClick={this.copyToClipboad}/>
                    <Button href="#" text="New Quote" onClick={this.handleNewQuote}/>
                </div>
            </div>
        )
    }
}

const mapStateToProps = state => {
    const author = state.author;
    const quote = state.quote;
    return {
        quote: quote,
        author: author
    }
}

export default connect(
    mapStateToProps, 
    { getQuote }
)(QuoteBox)