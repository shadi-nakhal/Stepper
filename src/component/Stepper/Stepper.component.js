import React, { Component } from "react";
import PropTypes from "prop-types";
import "./Stepper.scss";

export default class Stepper extends Component {
  constructor() {
    super();
    this.state = {
      steps: [],
    };
  }

  componentDidMount() {
    const { steps, location } = this.props;
    const stepsState = steps.map((step, index) => {
      const stepObj = {};
      stepObj.description = this.descriptionDict[step];
      stepObj.highlighted = step === location ? true : false;
      stepObj.selected = step === location ? true : false;
      stepObj.completed =
        steps.indexOf(step) < steps.indexOf(location) ? true : false;
      return stepObj;
    });

    this.setState({
      steps: stepsState,
    });
  }

  descriptionDict = {
    SHIPPING_STEP: "Shipping",
    BILLING_STEP: "Review & payments",
    DETAILS_STEP: "Success",
  };

  componentDidUpdate(prevProps) {
    if (prevProps.location !== this.props.location) {
      const { steps, location } = this.props;
      const stepsState = steps.map((step, index) => {
        const stepObj = {};
        stepObj.description = this.descriptionDict[step];
        stepObj.highlighted = step === location ? true : false;
        stepObj.selected = step === location ? true : false;
        stepObj.completed =
          steps.indexOf(step) < steps.indexOf(location) ? true : false;
        return stepObj;
      });

      this.setState({
        steps: stepsState,
        location,
      });
    }
  }

  render() {
    const { steps } = this.state;
    const stepsJSX = steps.map((step, index) => {
      if (step.description !== "Success") {
        return (
          <div className="step-wrapper" key={index}>
            <div className="stepSub-Wrapper">
              <div
                className="divider-line"
                style={{
                  backgroundColor:
                    step.highlighted || step.completed ? "#A82222" : "#DBDBDB",
                }}
              ></div>
              <div
                className={`step-number ${
                  step.selected
                    ? "step-number-selected"
                    : "step-number-disabled"
                }`}
                style={{
                  background:
                    step.selected || step.completed ? "#A82222" : "DBDBDB",
                  opacity: step.selected || step.completed ? "1" : "0.3",
                  padding: step.completed ? "0px" : "3px",
                }}
              >
                {step.completed ? (
                  <span
                    style={{
                      color: "white",
                      margin: "5px",
                    }}
                  >
                    &#10003;
                  </span>
                ) : (
                  index + 1
                )}
              </div>
              <div
                className="divider-line"
                style={{
                  backgroundColor: step.completed ? "#A82222" : "#DBDBDB",
                }}
              ></div>
            </div>
            <div
              className={`step-description ${
                step.highlighted && "step-description-active"
              }`}
            >
              {step.description}
            </div>
          </div>
        );
      }
    });

    return <div className="stepper-wrapper">{stepsJSX}</div>;
  }
}

Stepper.propTypes = {
  steps: PropTypes.array.isRequired,
  location: PropTypes.string.isRequired,
};
