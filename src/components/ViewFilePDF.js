import React, { Component } from "react";
import WebView  from 'react-native-webview';

class ViewFilePDF extends Component {
    constructor(props) {
        super(props);
            this.state = {
                TenFile: this.props.tenFile,
            };
        }
        
    
        render() {
            return (
                <WebView
                    startInLoadingState={true}
                    source={{uri: 'https://drive.google.com/viewerng/viewer?embedded=true&url=' + this.state.TenFile}}
                    style={{width: this.props.w, height:this.props.height, flex:1}}
                />
            );
        }
}

export default ViewFilePDF;