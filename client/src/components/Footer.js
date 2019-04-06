import React, {Component} from 'react'

class Footer extends Component {

  render() {
    return (
      <footer className="page-footer blue lighten-3">
        <div className="container">
          <div className="row">
            <div className="col l6 s12">
              <h5 className="white-text">Learn from the bests</h5>
              <p className="grey-text text-lighten-3">Failure is always better then surrender</p>
            </div>
            <div className="col l4 offset-l2 s12">
              <h5 className="white-text">Links</h5>
              <ul>
                <li><a className="grey-text text-lighten-3" href="http://goreit.pl">Goreit.pl</a></li>
                <li><a className="grey-text text-lighten-3" href="http://java.com">Java.com</a></li>
                <li><a className="grey-text text-lighten-3" href="http://reactjs.com">Reactjs.com</a></li>
              </ul>
            </div>
          </div>
        </div>
        <div className="footer-copyright">
          <div className="container">
            © 2019 <a className="grey-text text-lighten-4 " href="http://goreit.pl"> GoreIT</a>
            <a className="grey-text text-lighten-4 right" href="http://gjava.pl"> Zespół Gjava.pl</a>
          </div>
        </div>
      </footer>
    )
  }
}

export default Footer;