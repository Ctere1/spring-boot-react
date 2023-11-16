import React, { useState, useEffect } from "react";
import TutorialDataService from "../services/tutorialService";
import { Link } from "react-router-dom";
import Pagination from "@mui/material/Pagination";
import { connect } from "react-redux";
import { withRouter } from '../common/withRouter';
import { FormControl, FormControlLabel, FormGroup, InputLabel, MenuItem, Select, Switch, TextField } from "@mui/material";
import { updateTutorial } from "../actions/tutorials";
import { Button, Card, ListGroup } from "react-bootstrap";

const TutorialsList = () => {
    const [tutorials, setTutorials] = useState([]);
    const [currentTutorial, setCurrentTutorial] = useState(null);
    const [currentIndex, setCurrentIndex] = useState(-1);
    const [searchTitle, setSearchTitle] = useState("");

    const [page, setPage] = useState(1);
    const [count, setCount] = useState(0);
    const [pageSize, setPageSize] = useState(5);
    const [sortBy, setSortBy] = useState("id");
    const [sortDirection, setSortDirection] = useState("asc");
    const [getPublished, setGetPublished] = useState(false);

    const pageSizes = [5, 10, 20];
    const sortParams = ["id", "title", "description"];
    const sortDirections = ["asc", "desc"];

    const onChangeSearchTitle = (e) => {
        setSearchTitle(e.target.value);
    };

    const getRequestParams = (searchTitle, page, pageSize, sortBy) => {
        let params = {};

        if (searchTitle) {
            params["title"] = searchTitle;
        }

        if (page) {
            params["page"] = page;
        }

        if (pageSize) {
            params["size"] = pageSize;
        }

        if (sortBy) {
            params["sort"] = sortBy + ',' + sortDirection;
        }

        return params;
    };

    const retrieveTutorials = () => {
        const params = getRequestParams(searchTitle, page, pageSize, sortBy);

        if (getPublished) {
            TutorialDataService.findPublished(params)
                .then((response) => {
                    const { tutorials, totalPages } = response.data;

                    setTutorials(tutorials);
                    setCount(totalPages);

                    console.log(response.data);
                })
                .catch((e) => {
                    console.log(e);
                });
        } else {
            TutorialDataService.getAll(params)
                .then((response) => {
                    const { tutorials, totalPages } = response.data;

                    setTutorials(tutorials);
                    setCount(totalPages);

                    console.log(response.data);
                })
                .catch((e) => {
                    console.log(e);
                });
        }

    };

    // eslint-disable-next-line react-hooks/exhaustive-deps
    useEffect(retrieveTutorials, [page, pageSize, searchTitle, sortBy, sortDirection, getPublished]);

    const refreshList = () => {
        retrieveTutorials();
        setCurrentTutorial(null);
        setCurrentIndex(-1);
    };

    const setActiveTutorial = (tutorial, index) => {
        setCurrentTutorial(tutorial);
        setCurrentIndex(index);
    };

    const removeAllTutorials = () => {
        TutorialDataService.deleteAll()
            .then((response) => {
                console.log(response.data);
                refreshList();
            })
            .catch((e) => {
                console.log(e);
            });
    };

    const removeTheTutorial = (tutorial) => {
        TutorialDataService.delete(tutorial.id)
            .then((response) => {
                console.log(response.data);
                refreshList();
            })
            .catch((e) => {
                console.log(e);
            });
    };

    const handlePageChange = (event, value) => {
        setPage(value);
    };

    const handlePageSizeChange = (event) => {
        setPageSize(event.target.value);
        setPage(1);
    };

    const handleSortByChange = (event) => {
        setSortBy(event.target.value);
    };

    const handleSortDirChange = (event) => {
        setSortDirection(event.target.value);
    };

    const handleGetPublishedChange = (event) => {
        setGetPublished(event.target.checked);
    }

    return (
        <div className="row justify-content-md-center">

            <div className="col-md-12">

            </div>

            <div className="col-md-6">
                <h4>Search</h4>
                <TextField fullWidth className="mb-2" id="outlined-basic" label="Search by title" variant="filled" value={searchTitle} onChange={onChangeSearchTitle} />
                {/* <Button className="mt-2" variant="outlined" onClick={retrieveTutorials} style={{ textTransform: "none" }}>Search</Button> */}

                <FormControl fullWidth className="my-1">
                    <InputLabel id="pageSize-select-label">Items per Page</InputLabel>
                    <Select
                        labelId="pageSize-select-label"
                        id="sortBy-simple-select"
                        value={pageSize}
                        label="Items per Page"
                        onChange={handlePageSizeChange}
                    >
                        {pageSizes.map((size) => (
                            <MenuItem value={size}>{size}</MenuItem>
                        ))}
                    </Select>
                </FormControl>

                <FormControl fullWidth className="my-1">
                    <InputLabel id="sortBy-select-label">Sort By</InputLabel>
                    <Select
                        labelId="sortBy-select-label"
                        id="sortBy-simple-select"
                        value={sortBy}
                        label="Sort By"
                        onChange={handleSortByChange}
                    >
                        {sortParams.map((params) => (
                            <MenuItem value={params}>{params.charAt(0).toUpperCase() + params.slice(1)}</MenuItem>
                        ))}
                    </Select>
                </FormControl>

                <FormControl fullWidth className="my-1">
                    <InputLabel id="sortDir-select-label">Sort direction</InputLabel>
                    <Select
                        labelId="sortDir-select-label"
                        id="sortDir-simple-select"
                        value={sortDirection}
                        label="Sort direction"
                        onChange={handleSortDirChange}
                    >
                        {sortDirections.map((dir) => (
                            <MenuItem value={dir}>{dir.charAt(0).toUpperCase() + dir.slice(1)}</MenuItem>
                        ))}
                    </Select>
                </FormControl>

                <FormGroup>
                    <FormControlLabel
                        control={
                            <Switch
                                label="Get Published Tutorials"
                                className="my-2"
                                onChange={handleGetPublishedChange}
                            />
                        }
                        label="Get Published Tutorials" />
                </FormGroup>

                <Pagination
                    className="my-3"
                    count={count}
                    page={page}
                    siblingCount={1}
                    boundaryCount={1}
                    variant="outlined"
                    shape="rounded"
                    onChange={handlePageChange}
                />

            </div>

            <div className="col-md-6">
                {currentTutorial ? (
                    <div>
                        <h4>Tutorial</h4>
                        <Card style={{ marginTop: 0 }}>
                            <Card.Header><strong>Id:</strong> {currentTutorial.id}</Card.Header>
                            <Card.Body>
                                <Card.Title> <strong>Title:</strong> {currentTutorial.title}</Card.Title>
                                <Card.Text>
                                    <div>
                                        <label>
                                            <strong>Description:</strong>
                                        </label>{" "}
                                        {currentTutorial.description}
                                        <label>
                                            <strong>Status:</strong>
                                        </label>{" "}
                                        {currentTutorial.published ? "Published" : "Pending"}
                                    </div>
                                </Card.Text>
                                <Link to={"/tutorials/" + currentTutorial.id}>
                                    <Button size="small" variant="primary" onClick={() => updateTutorial(currentTutorial)} style={{ textTransform: "none" }}>Edit</Button>
                                </Link>
                                <Button className="m-3" variant="danger" onClick={() => removeTheTutorial(currentTutorial)} style={{ textTransform: "none" }}>Delete</Button>

                            </Card.Body>
                        </Card>
                    </div>
                ) : (
                    <div>
                        <br />
                        <p>Please select Tutorial...</p>
                    </div>
                )}
            </div>

            <div className="col-md-12">
                <h4>Tutorials List</h4>
                <ListGroup>
                    {tutorials &&
                        tutorials.map((tutorial, index) => (
                            <ListGroup.Item
                                active={index === currentIndex}
                                onClick={() => setActiveTutorial(tutorial, index)}
                                key={index}>
                                {tutorial.title}
                            </ListGroup.Item>
                        ))
                    }
                </ListGroup>
                <div className="col-md-12 d-flex align-items-center justify-content-center">
                    <Button className="m-3" size="small" variant="danger" onClick={removeAllTutorials} style={{ textTransform: "none" }}>Remove All</Button>
                    <Link to={"/tutorials/add"}>
                        <Button className="m-3" size="small" variant="success" style={{ textTransform: "none" }}>Add New</Button>
                    </Link>
                </div>

            </div>

        </div>
    );
};

export default connect(null,)(withRouter(TutorialsList));;