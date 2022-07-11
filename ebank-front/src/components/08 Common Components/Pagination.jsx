import React, { useEffect, useState } from "react";
import _ from "lodash";
import SearchIcon from "@mui/icons-material/Search";

const Pagination = ({ setPage, page, numOfPages }) => {
  const [pages, setPages] = useState([]);
  const [pageToHop, setPageToHop] = useState(1);

  const handleSetPage = (page) => {
    setPage(page);
  };

  const handlePrevious = () => {
    setPage(page - 1);
  };
  const handleNext = () => {
    setPage(page + 1);
  };

  const handleHop = (e) => {
    if (e.key === "Enter" && Number(e.target.value) <= numOfPages) {
      handleSetPage(Number(e.target.value));
    } else if (e.key === "Enter" && Number(e.target.value) > numOfPages) {
      setPageToHop(numOfPages);
      handleSetPage(numOfPages);
    }
  };

  const onSearchClick = () => {
    if (pageToHop <= numOfPages) {
      handleSetPage(pageToHop);
    } else if (pageToHop > numOfPages) {
      setPageToHop(numOfPages);
      handleSetPage(numOfPages);
    }
  };

  useEffect(() => {
    if (numOfPages >= 5) {
      setPages(_.range(2, 5));
    } else if (numOfPages < 5) {
      setPages(_.range(2, numOfPages));
    }
    console.log(pages);
  }, [numOfPages]);
  if (numOfPages > 5) {
    return (
      <div>
        <div className="d-flex justify-content-center">
          <ul className="pagination">
            {/* ARROW <<<<<<<<<<<<----------- */}

            <li className="page-item">
              <button
                onClick={handlePrevious}
                disabled={page === 1 ? true : false}
                className="page-link"
              >
                &lt;
              </button>
            </li>

            {/* FIRST */}

            <li className={page === 1 ? "page-item active" : "page-item"}>
              <button onClick={() => handleSetPage(1)} className="page-link">
                1
              </button>
            </li>

            {/* BODY */}
            {pages.map((p) => (
              <li
                className={p === page ? "page-item active" : "page-item"}
                key={p}
              >
                <button onClick={() => handleSetPage(p)} className="page-link">
                  {p}
                </button>
              </li>
            ))}

            {/* SPACE  */}

            {page < 5 || page === numOfPages ? (
              <li className="page-item">
                <button className="page-link nohoverbtn" disabled>
                  &lt;...&gt;
                </button>
              </li>
            ) : (
              <li className="page-item active">
                <button className="page-link">&lt;{page}&gt;</button>
              </li>
            )}

            {/* LAST */}

            <li
              className={page === numOfPages ? "page-item active" : "page-item"}
            >
              <button
                onClick={() => handleSetPage(numOfPages)}
                className="page-link"
              >
                {numOfPages}
              </button>
            </li>
            {/* ARROW ---------------->>>>>>>>>>>>>>>>>>> */}

            <li className="page-item">
              <button
                disabled={page === numOfPages ? true : false}
                onClick={handleNext}
                className="page-link"
              >
                &gt;
              </button>
            </li>

            <li className="page-item ">
              <div className="row">
                <div className="col ms-4">
                  <input
                    className="page-link paginationPageInputBox "
                    placeholder="#"
                    maxLength={3}
                    value={isNaN(pageToHop) ? setPageToHop(1) : pageToHop}
                    onChange={(e) => setPageToHop(Number(e.target.value))}
                    onKeyPress={(e) => handleHop(e)}
                  />
                </div>
              </div>
            </li>
            <li className="">
              <div className="col page-link" onClick={() => onSearchClick()}>
                <SearchIcon />
              </div>
            </li>
          </ul>
        </div>
      </div>
    );
  } else {
    return (
      <div>
        <div className="d-flex justify-content-center">
          <ul className="pagination">
            {/* ARROW <<<<<<<<<<<<----------- */}

            <li className="page-item">
              <button
                onClick={handlePrevious}
                disabled={page === 1 ? true : false}
                className="page-link"
              >
                &lt;
              </button>
            </li>

            {/* FIRST */}

            <li className={page === 1 ? "page-item active" : "page-item"}>
              <button onClick={() => handleSetPage(1)} className="page-link">
                1
              </button>
            </li>

            {/* BODY */}
            {pages.map((p) => (
              <li
                className={p === page ? "page-item active" : "page-item"}
                key={p}
              >
                <button onClick={() => handleSetPage(p)} className="page-link">
                  {p}
                </button>
              </li>
            ))}

            {/* LAST */}

            <li
              className={page === numOfPages ? "page-item active" : "page-item"}
            >
              <button
                onClick={() => handleSetPage(numOfPages)}
                className="page-link"
              >
                {numOfPages}
              </button>
            </li>
            {/* ARROW ---------------->>>>>>>>>>>>>>>>>>> */}

            <li className="page-item">
              <button
                disabled={page === numOfPages ? true : false}
                onClick={handleNext}
                className="page-link"
              >
                &gt;
              </button>
            </li>
          </ul>
        </div>
      </div>
    );
  }
};

export default Pagination;
