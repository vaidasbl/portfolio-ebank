import React from "react";
import { useNavigate } from "react-router";

function DashboardView({
  header,
  children,
  preFooter,
  submitHandler,
  handlerName,
}) {
  const navigate = useNavigate();
  return (
    <div className="dashboard-container ">
      <div className="container">
        <div className="summarytitle  mt-4">{header}</div>
        <div
          className={
            preFooter
              ? "body-container-with-prefooter mt-4"
              : "body-container mt-4 "
          }
        >
          {children}
        </div>
        {preFooter && <div className="prefooter">{preFooter}</div>}

        <hr className="hrhr1" />
        <div>
          <div className="row">
            <div className="col-6">
              <button
                type="button"
                className="myBtn4"
                onClick={() => navigate(-1)}
              >
                Go back
              </button>
            </div>
            {submitHandler && (
              <div className="col-6">
                <button
                  type="button"
                  className="myBtn4"
                  onClick={submitHandler}
                >
                  {handlerName}
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default DashboardView;
