import React from 'react'


const Landing = () => {
  return <div style={{textAlign: 'center'}}>

    <div className="row center-align">
      <div className="col s12 m6">
        <div className="card grey lighten-4">
          <div className="card-content ">
            <span className="card-title">Java Developer - po co sie uczyc ?</span>
            <iframe title={"java1"} width="560" height="315" src="https://www.youtube.com/embed/Jatq9-00y88"
                    frameBorder="0"
                    allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture"
                    allowFullScreen/>
          </div>
          <div className="card-action">
            <span> #JAVA, #PROGRAMOWANIE, #ZAROBKI </span>
          </div>
        </div>
      </div>
    </div>

    <div className="row center-align">
      <div className="col s12 m6">
        <div className="card grey lighten-4">
          <div className="card-content ">
            <span className="card-title">Jak sie uczymy ? Wyklad 1 - struktura warstwowa wielu projektow w JAVA</span>
            <iframe title={"java3"} width="560" height="315" src="https://www.youtube.com/embed/c95Yysdfuts"
                    frameBorder="0"
                    allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture"
                    allowFullScreen/>
          </div>
          <div className="card-action">
            <span> #JAVA, #REST, #SPRING, #HIBERNATE, #JUNIT, #SQL </span>
          </div>
        </div>
      </div>
    </div>

    <div className="row center-align">
      <div className="col s12 m6">
        <div className="card grey lighten-4">
          <div className="card-content ">
            <span className="card-title">Jak wyglada SCRUM w zwyklym dniu pracy Java Developera ?</span>
            <iframe title={"java2"} width="560" height="315" src="https://www.youtube.com/embed/QZik32VwmXI" frameBorder="0"
                    allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture"
                    allowFullScreen/>
          </div>
          <div className="card-action">
          <span> #Scrum, #Agile, #JIRA </span>
          </div>
        </div>
      </div>
    </div>

  </div>
}

export default Landing