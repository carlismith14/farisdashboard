import React, { useEffect, useState, useMemo } from "react";
import { styled, useTheme } from "@mui/material/styles";

import {
  Table,
  TableBody,
  Box,
  Stack,
  Typography,
  MenuItem,
  FormControl,
  Select,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  TablePagination,
  TableSortLabel,
  IconButton,
  FormControlLabel,
  Switch,
  switchClasses,
  CircularProgress,
  Accordion,
  AccordionDetails,
  AccordionSummary,
} from "@mui/material";

import KeyboardArrowLeft from "@mui/icons-material/KeyboardArrowLeft";
import KeyboardArrowRight from "@mui/icons-material/KeyboardArrowRight";
import LastPageIcon from "@mui/icons-material/LastPage";
import FirstPageIcon from "@mui/icons-material/FirstPage";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";

import {
  CustomViewIcon,
  DownloadIcon,
  MinimalViewIcon,
  ArrowLeftIcon,
} from "./utility/CustomIcons";

import { Desktop, Mobile } from "../components/utility/responsive";

import useFilters from "./hooks/filters";
import { contentTypeLabels, timeSpanLabels } from "./constants/content";
import Header from "./Header";

const SwitchTextTrack = styled(Switch)({
  width: 80,
  height: 48,
  padding: 8,

  [`& .${switchClasses.track.backgroundColor}`]: {
    background: "red",
    color: "red",
  },
  [`& .${switchClasses.switchBase}`]: {
    padding: 11,
    color: "#fff",
  },
  [`& .${switchClasses.thumb}`]: {
    width: 26,
    height: 26,
    backgroundColor: "#fff",
  },
  [`& .${switchClasses.track}`]: {
    background: "#0e355a",

    opacity: "1 !important",
    borderRadius: 20,
    position: "relative",
    "&:before, &:after": {
      display: "inline-block",
      position: "absolute",
      top: "50%",
      width: "50%",
      transform: "translateY(-50%)",
      color: "#fff",
      textAlign: "center",
      fontSize: "14px",
      fontWeight: 700,
    },
    "&:before": {
      content: '"ON"',
      left: 4,
      opacity: 0,
      fontSize: "12px",
    },
    "&:after": {
      content: '"OFF"',
      right: 4,
      fontSize: "12px",
    },
    "& .checked": {},
  },
  [`& .${switchClasses.checked}`]: {
    [`&.${switchClasses.switchBase}`]: {
      transform: "translateX(29px)",
    },
    [`& .${switchClasses.thumb}`]: {
      backgroundColor: "#fff",
    },
    [`& + .${switchClasses.track}`]: {
      // background: "#005fa9",
      "&:before": {
        opacity: 1,
      },
      "&:after": {
        opacity: 1,
      },
    },
  },
});

function TablePaginationActions(props) {
  const theme = useTheme();
  const { count, page, rowsPerPage, onPageChange } = props;

  const handleFirstPageButtonClick = (event) => {
    onPageChange(event, 0);
  };

  const handleBackButtonClick = (event) => {
    onPageChange(event, page - 1);
  };

  const handleNextButtonClick = (event) => {
    onPageChange(event, page + 1);
  };

  const handleLastPageButtonClick = (event) => {
    onPageChange(event, Math.max(0, Math.ceil(count / rowsPerPage) - 1));
  };

  // Calculate the range of currently displayed rows
  const startRow = page * rowsPerPage + 1;
  const endRow = Math.min((page + 1) * rowsPerPage, count);

  return (
    <Box
      sx={{
        flexShrink: 0,
        ml: 2.5,

        "& .MuiButtonBase-root, ": {
          "& .Mui-disabled": {
            color: "rgb(94, 208, 56)",

            "& .MuiSvgIcon-root": {
              color: "rgb(57, 77, 100)",
            },
          },
        },
      }}
    >
      <IconButton
        sx={{ paddingLeft: "0" }}
        onClick={handleFirstPageButtonClick}
        disabled={page === 0}
        aria-label="first page"
      >
        {theme.direction === "rtl" ? <LastPageIcon /> : <FirstPageIcon />}
      </IconButton>
      <IconButton
        onClick={handleBackButtonClick}
        disabled={page === 0}
        aria-label="previous page"
      >
        {theme.direction === "rtl" ? (
          <KeyboardArrowRight />
        ) : (
          <KeyboardArrowLeft />
        )}
      </IconButton>

      {/* <span style={{width:"100px"}}>{`${startRow}-${endRow} of ${count}`}</span> */}
      <Box
        display="flex"
        justifyContent="center"
        alignItems="center"
        width="100px"
        sx={{ display: "inline-block", textAlign: "center", fontWeight: "600" }}
      >
        {`${startRow}-${endRow} of ${count}`}
      </Box>

      <IconButton
        onClick={handleNextButtonClick}
        disabled={page >= Math.ceil(count / rowsPerPage) - 1}
        aria-label="next page"
      >
        {theme.direction === "rtl" ? (
          <KeyboardArrowLeft />
        ) : (
          <KeyboardArrowRight />
        )}
      </IconButton>
      <IconButton
        sx={{ paddingRight: "0" }}
        onClick={handleLastPageButtonClick}
        disabled={page >= Math.ceil(count / rowsPerPage) - 1}
        aria-label="last page"
      >
        {theme.direction === "rtl" ? <FirstPageIcon /> : <LastPageIcon />}
      </IconButton>
    </Box>
  );
}

// TablePaginationActions.propTypes = {
//   count: PropTypes.number.isRequired,
//   page: PropTypes.number.isRequired,
//   rowsPerPage: PropTypes.number.isRequired,
//   onPageChange: PropTypes.func.isRequired,
// };

function descendingComparator(a, b, orderBy) {
  if (b[orderBy] < a[orderBy]) {
    return -1;
  }
  if (b[orderBy] > a[orderBy]) {
    return 1;
  }
  return 0;
}

function getComparator(order, orderBy) {
  return order === "desc"
    ? (a, b) => descendingComparator(a, b, orderBy)
    : (a, b) => -descendingComparator(a, b, orderBy);
}

function stableSort(array, comparator) {
  const stabilizedThis = array.map((el, index) => [el, index]);
  stabilizedThis.sort((a, b) => {
    const order = comparator(a[0], b[0]);
    if (order !== 0) {
      return order;
    }
    return a[1] - b[1];
  });
  return stabilizedThis.map((el) => el[0]);
}

const sortedTimeSpans = Object.entries(timeSpanLabels).sort((a, b) => {
  if (a[0] === "0") return 1;
  if (b[0] === "0") return -1;
  return 0;
});

const DataPage = () => {
  const [itemsYouShared, setItemsYouShared] = useState([]);

  const [isFetching, setIsFetching] = useState(false);

  const [order, setOrder] = React.useState("asc");
  const [orderBy, setOrderBy] = React.useState("");

  const [selected, setSelected] = React.useState([]);
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(50);

  const [filterValues, onFilterChange] = useFilters(
    {
      timeSpan: 30,
      contentType: "ALL",
      includeSelf: false,
    },
    "user-sharing-filters"
  );

  const [dataView, setDataView] = React.useState("minimal");
  const [expandedAccordions, setExpandedAccordions] = React.useState([]);

  useEffect(() => {
    const fetchData = async () => {
      setIsFetching(true);
      try {
        const response = await fetch(
          // "https://jsonplaceholder.typicode.com/comments"
          // "https://my.api.mockaroo.com/ace.json?key=dbd7cf20"
          "https://mocki.io/v1/7fae2147-c31b-43fd-b86d-4a51bf031e6a"
          // "https://run.mocky.io/v3/67c3fd59-8f3b-431c-9f31-b9d0a0a29891"
        );
        const result = await response.json();

        // Apply filters
        let filteredItems = result;

        if (filterValues.contentType !== "ALL") {
          filteredItems = filteredItems.filter(
            (item) => item.contentType === filterValues.contentType
          );
        }

        // Calculate the past date based on timeSpan
        const currentDate = new Date();
        const pastDate = new Date();
        pastDate.setDate(currentDate.getDate() - filterValues.timeSpan);

        // Apply filters
        if (filterValues.contentType !== "ALL") {
          filteredItems = filteredItems.filter(
            (item) => item.contentType === filterValues.contentType
          );
        }

        // Filter by dateShared
        if (filterValues.timeSpan !== 0) {
          // 0 is for 'all time', so no date filter is applied
          filteredItems = filteredItems.filter((item) => {
            const itemDate = new Date(item.dateShared);
            return itemDate >= pastDate && itemDate <= currentDate;
          });
        }

        setItemsYouShared(filteredItems);
        setIsFetching(false);
      } catch (error) {
        console.error("Error fetching data:", error);
        setIsFetching(false);
      }
    };

    fetchData();
  }, [filterValues]);

  const handleRequestSort = (event, property) => {
    const isAsc = orderBy === property && order === "asc";
    setOrder(isAsc ? "desc" : "asc");
    setOrderBy(property);
  };

  const createSortHandler = (property) => (event) => {
    handleRequestSort(event, property);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const isSelected = (id) => selected.indexOf(id) !== -1;

  const emptyRows =
    page > 0
      ? Math.max(0, (1 + page) * rowsPerPage - itemsYouShared.length)
      : 0;

  const formatDateRange = (labelKey) => {
    switch (labelKey) {
      case "S_TODAY":
        return "Today";
      case "S_LAST_7_DAYS":
        return "Last 7 Days";
      case "S_LAST_30_DAYS":
        return "Last 30 Days";
      case "S_LAST_3_MONTHS":
        return "Last 3 Months";
      case "S_LAST_6_MONTHS":
        return "Last 6 Months";
      case "S_LAST_12_MONTHS":
        return "Last 12 Months";
      case "S_YEAR_TO_DATE":
        return "Year to Date";
      case "S_ALL_TIME":
        return "All Time";
      default:
        return labelKey; // Return the label key as is if it doesn't match any known format
    }
  };

  const formatContentType = (contentTypeKey) => {
    switch (contentTypeKey) {
      case "S_ALL_TYPES":
        return "All Types";
      case "S_DECKS":
        return "Decks";
      case "S_PDFS":
        return "PDFs";
      case "S_VIDEOS":
        return "Videos";
      case "S_LINKS":
        return "Links";
      case "S_PODCASTS":
        return "Podcasts";
      case "S_CUSTOMS":
        return "Custom";
      default:
        return contentTypeKey; // Return the content type key as is if it doesn't match any known format
    }
  };

  const mapLabels = (labels, ItemComponent, type) =>
    labels.map(([key, label]) => (
      <ItemComponent key={key} value={key}>
        {type === "date" ? formatDateRange(label) : formatContentType(label)}

        {/* {console.log(labels)} */}
      </ItemComponent>
    ));

  const onCheckChange = (e) =>
    onFilterChange({
      target: { name: e.target.name, value: e.target.checked },
    });

  const visibleRows = React.useMemo(
    () =>
      stableSort(itemsYouShared, getComparator(order, orderBy)).slice(
        page * rowsPerPage,
        page * rowsPerPage + rowsPerPage
      ),
    [itemsYouShared, order, orderBy, page, rowsPerPage, expandedAccordions]
  );

  const handleChangePage = (event, newPage) => {
    setPage(newPage);

    if (dataView === "expanded") {
      const newArray = [];
      visibleRows.forEach((log, index) => newArray.push(index));
      setExpandedAccordions(newArray);
    } else {
      setExpandedAccordions([]);
    }
  };

  const expandAll = () => {
    if (dataView === "minimal") {
      const newArray = [];
      visibleRows.forEach((log, index) => newArray.push(index));
      setExpandedAccordions(newArray);
      setDataView("expanded");
    } else {
      setExpandedAccordions([]);
      setDataView("minimal");
    }
  };

  const toggleAccordion = (index) => {
    if (expandedAccordions.includes(index))
      setExpandedAccordions(
        expandedAccordions.filter((number) => number !== index)
      );
    else setExpandedAccordions([...expandedAccordions, index]);
  };

  const accordionClicked = (index) => {
    toggleAccordion(index);
  };

  const isAccordionExpanded = (index) => {
    if (Array.isArray(expandedAccordions)) {
      return expandedAccordions.includes(index);
    }
    if (expandedAccordions instanceof Map) {
      return expandedAccordions.has(index);
    }
    return false;
  };

  return (
    <>
      <Box sx={{}}>
        {console.log(itemsYouShared)}

        <Mobile>
          <Box sx={{ padding: "6px 8px 6px 16px" }}>
            <Header />

            <Box
              sx={{
                background: "transparent",
                display: "flex",
                alignItems: "center",
                width: "100%",
                height: "64px",
                padding: "8px",
                zIndex: 1,
                "& .internal": {
                  fontSize: "10px",
                  margin: "0px 8px",
                },
                "& button": {
                  color: "white",
                },
              }}
            >
              <IconButton>
                <ArrowLeftIcon />
              </IconButton>

              <Typography
                fontSize={20}
                fontWeight={600}
                sx={{ marginLeft: "5px" }}
              >
                {" "}
                Items You Shared
              </Typography>
            </Box>

            <Box
              sx={{
                position: "relative",
                fontWeight: "600",
                padding: "0 16px",
                "& div": {
                  fontSize: "14px",
                },
                "& p": {
                  fontSize: "14px",
                },
                "& span": {
                  fontSize: "14px",
                },
              }}
            >
              <Stack
                sx={{
                  gap: "14px",
                  flexDirection: "column",
                }}
              >
                <Stack direction="row" spacing={3}>
                  <FormControl sx={{ width: "50%" }}>
                    <Typography sx={{ mb: 0.75, fontWeight: "600" }}>
                      Time Span
                    </Typography>
                    <Select
                      value={filterValues.timeSpan}
                      sx={{
                        bgcolor: "white",
                        paddingLeft: 1,
                        borderRadius: "2px",
                      }}
                      variant="standard"
                      onChange={onFilterChange}
                      inputProps={{
                        name: "timeSpan",
                        id: "time-span",
                      }}
                    >
                      {mapLabels(sortedTimeSpans, MenuItem, "date")}
                    </Select>
                  </FormControl>
                  <FormControl sx={{ width: "50%" }}>
                    <Typography sx={{ mb: 0.75, fontWeight: "600" }}>
                      Content Type
                    </Typography>

                    <Select
                      value={filterValues.contentType}
                      sx={{
                        bgcolor: "white",
                        paddingLeft: 1,
                        borderRadius: "2px",
                        minWidth: "150px",
                      }}
                      variant="standard"
                      onChange={onFilterChange}
                      inputProps={{
                        name: "contentType",
                        id: "content-type",
                      }}
                    >
                      {mapLabels(
                        Object.entries(contentTypeLabels),
                        MenuItem,
                        "content"
                      )}
                    </Select>
                  </FormControl>
                </Stack>

                <FormControl width="100%" component={Stack}>
                  <FormControlLabel
                    control={
                      <SwitchTextTrack
                        color="secondary"
                        name="includeSelf"
                        variant="standard"
                        checked={filterValues.includeSelf}
                        onChange={onCheckChange}
                        sx={{
                          marginLeft: "auto",
                        }}
                      />
                    }
                    label="Include Emails to self"
                    labelPlacement="start"
                    width="100%"
                    sx={{
                      marginLeft: "0",

                      "& span": {
                        fontWeight: "600",
                      },
                    }}
                  />
                </FormControl>

                <Stack
                  direction="row"
                  alignItems="center"
                  justifyContent="space-between"
                >
                  <Stack
                    direction="row"
                    spacing={1.25}
                    onClick={expandAll}
                    sx={{
                      display: "flex",
                      alignItems: "center",
                      cursor: "pointer",
                    }}
                  >
                    <Box
                      sx={{
                        bgcolor: "#005fa9",
                        width: "32px",
                        height: "32px",
                        borderRadius: "6px",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                      }}
                    >
                      {dataView === "minimal" ? (
                        <CustomViewIcon sx={{ fontSize: "16px" }} />
                      ) : (
                        <MinimalViewIcon sx={{ fontSize: "16px" }} />
                      )}
                    </Box>
                    {dataView === "minimal" ? (
                      <Typography sx={{ fontWeight: "600" }}>
                        Expanded View
                      </Typography>
                    ) : (
                      <Typography sx={{ fontWeight: "600" }}>
                        Minimal View
                      </Typography>
                    )}
                  </Stack>
                </Stack>
              </Stack>

              {isFetching ? (
                <Box
                  display="flex"
                  justifyContent="center"
                  alignItems="center"
                  width="100%"
                  height="50vh"
                >
                  <CircularProgress sx={{ color: "white" }} />
                </Box>
              ) : (
                <>
                  <TablePagination
                    sx={{
                      color: "#d9d9d9",
                      marginLeft: "0",
                      paddingLeft: "0",
                      marginRight: "0",
                      marginTop: "10px",
                      marginBottom: "10px",
                      borderTop: "none",
                      button: {
                        color: "#d9d9d9",
                      },
                      fontWeight: "600",

                      "& .MuiIconButton-root": {
                        "& disabled": {
                          color: "pink",
                        },
                      },

                      "& .MuiTablePagination-displayedRows": {
                        display: "none",
                        margin: "0",
                        padding: "0",
                      },

                      "& .MuiTablePagination-spacer": {
                        display: "none",
                      },
                      "& .MuiToolbar-root": {
                        justifyContent: "flex-start",

                        padding: "0",
                        margin: "0",
                      },

                      "& .MuiTablePagination-selectLabel, .MuiNativeSelect-select":
                        {
                          fontWeight: "600",
                        },

                      "& .MuiTablePagination-toolbar": {
                        flexWrap: "wrap",
                      },

                      "& .MuiBox-root": {
                        margin: "0",
                        marginLeft: "auto",
                      },

                      "& .MuiTablePagination-selectIcon": {
                        color: "#005FA9",
                      },

                      "@media screen and (max-width: 540px)": {
                        "& .MuiToolbar-root": {
                          justifyContent: "center", // Centering flex items when wrapping starts
                        },

                        "& .MuiBox-root": {
                          marginLeft: "0", // Eliminating marginLeft on flex children when wrapped
                        },
                      },
                    }}
                    component="div"
                    count={itemsYouShared.length}
                    rowsPerPage={rowsPerPage}
                    page={page}
                    rowsPerPageOptions={[
                      { label: "50 rows", value: 50 },
                      { label: "100 rows", value: 100 },
                      { label: "All rows", value: -1 },
                    ]}
                    slotProps={{
                      select: {
                        inputProps: {
                          "aria-label": "rows per page",
                        },
                        native: true,
                      },
                    }}
                    onPageChange={handleChangePage}
                    onRowsPerPageChange={handleChangeRowsPerPage}
                    ActionsComponent={TablePaginationActions}
                  />

                  <TableContainer
                    component={Paper}
                    sx={{
                      margin: "auto",
                      // maxHeight: "55vh",
                      maxHeight: "56vh",

                      backgroundColor: "inherit",
                      color: "#d9d9d9",
                      boxShadow: "none",

                      "&::-webkit-scrollbar": {
                        display: "none",
                      },
                    }}
                  >
                    <Table aria-label="simple table">
                      <TableBody>
                        {visibleRows.map((row, index) => (
                          <TableRow key={row.id}>
                            <TableCell
                              sx={{
                                paddingBottom: "10px",
                                paddingTop: "0px",
                                paddingLeft: "0",
                                paddingRight: "0",
                                marginBottom: "10px",
                                border: "none",
                                width: "100%",
                                // cursor: "pointer",
                              }}
                            >
                              <Accordion
                                disableGutters
                                onChange={() => accordionClicked(index)}
                                expanded={isAccordionExpanded(index)}
                                sx={{
                                  // cursor: "pointer",
                                  width: "100%",
                                  padding: "0",
                                  margin: "0",
                                  bgcolor: "#0e355a",
                                  color: "white",
                                  borderRadius: "10px",
                                  "& svg": {
                                    color: "white",
                                  },
                                  "& .MuiTypography-root": {
                                    fontSize: "14px",
                                    lineHeight: "17.6px",
                                  },
                                  "& p": {
                                    fontSize: "14px",
                                  },
                                }}
                              >
                                <AccordionSummary
                                  expandIcon={<ExpandMoreIcon />}
                                  aria-controls="panel1-content"
                                  id="panel1-header"
                                  sx={{
                                    paddingLeft: "22px",
                                    "& .Mui-expanded": {
                                      marginBottom: "0",

                                      "& .MuiButtonBase-root": {
                                        minHeight: "0px",
                                      },

                                      "&. MuiAccordionSummary-gutters": {
                                        minHeight: "0px",
                                      },

                                      "& .MuiAccordionSummary-root": {
                                        minHeight: "0px",
                                      },

                                      "& .makeStyles-summaryExpanded-76": {
                                        minHeight: "0px",
                                      },

                                      " & .MuiAccordionSummary-content": {
                                        minHeight: "0px",
                                      },
                                    },
                                  }}
                                >
                                  <Stack
                                    sx={{
                                      display: "block",
                                      margin: "0",
                                      padding: "0",
                                      maxWidth: "100%",
                                    }}
                                    direction="column"
                                    spacing={0.5}
                                  >
                                    <Typography>
                                      {row.title
                                        .split(" ")
                                        .map(
                                          (word) =>
                                            word.charAt(0).toUpperCase() +
                                            word.slice(1)
                                        )
                                        .join(" ")}
                                    </Typography>

                                    <Stack direction="row" spacing={2}>
                                      <Typography>{row.vaultId}</Typography>
                                      <Typography>{row.contentType}</Typography>
                                    </Stack>
                                  </Stack>
                                </AccordionSummary>
                                <AccordionDetails
                                  sx={{
                                    margin: "0",
                                    paddingBottom: "16px",
                                    paddingLeft: "22px",
                                    paddingTop: "0",
                                  }}
                                >
                                  Recipients
                                  {": "}
                                  {row.recipients}
                                  <Stack direction="row" spacing={1.5}>
                                    <Typography>
                                      Shared
                                      {": "}
                                      {row.dateShared}
                                    </Typography>
                                    <Typography>|</Typography>
                                    <Typography>
                                      Viewed
                                      {": "}
                                      {row.lastViewed}
                                    </Typography>
                                  </Stack>
                                </AccordionDetails>
                              </Accordion>
                            </TableCell>
                          </TableRow>
                        ))}
                      </TableBody>
                    </Table>
                  </TableContainer>
                </>
              )}
            </Box>
          </Box>
        </Mobile>

        <Desktop>
          <Box
            sx={{
              background: "transparent",
              display: "flex",
              alignItems: "center",
              width: "100%",
              height: "64px",
              padding: "8px 28px",
              // padding:"16px",
              marginTop: "20px",
              zIndex: 1,

              "& .internal": {
                fontSize: "10px",
                margin: "0px 8px",
              },
              "& button": {
                color: "white",
              },

              "@media screen and (min-width: 901px) and (max-width: 1050px)": {
                padding: "0",
              },
            }}
          >
            <IconButton>
              <ArrowLeftIcon />
            </IconButton>

            <Typography
              fontSize={20}
              fontWeight={600}
              sx={{ marginLeft: "5px" }}
            >
              {" "}
              Items You Shared
            </Typography>
          </Box>

          <Box
            sx={{
              color: "white",
              margin: "auto",
              minHeight: "100%",
              padding: "8px 24px",
              "@media screen and (min-width: 901px) and (max-width: 1050px)": {
                padding: "0",
              },
            }}
          >
            <Box
              sx={{
                position: "relative",
                fontWeight: "600",
                padding: "0 16px",
                "& div": {
                  fontSize: "14px",
                  // fontWeight: "600",
                  // lineHeight:"17.6px"
                },
                "& p": {
                  fontSize: "14px",
                  // fontWeight: "600",
                  // lineHeight:"17.6px"
                },
                "& span": {
                  fontSize: "14px",
                  // fontWeight: "600",
                },
              }}
              // className={classes.contentSection}
            >
              <Stack
                sx={{
                  marginBottom: "10px",
                  gap: "16px",
                  flexDirection: "row",
                  justifyContent: "space-between",
                  alignItems: "flex-end",
                }}
              >
                <Stack direction="row" spacing={2}>
                  <FormControl sx={{ width: "50%" }}>
                    <Typography sx={{ mb: 0.75 }}>Time Span</Typography>
                    <Select
                      value={filterValues.timeSpan}
                      sx={{
                        bgcolor: "white",
                        paddingLeft: 1,
                        borderRadius: "2px",
                      }}
                      variant="standard"
                      onChange={onFilterChange}
                      inputProps={{
                        name: "timeSpan",
                        id: "time-span",
                      }}
                    >
                      {mapLabels(sortedTimeSpans, MenuItem, "date")}
                    </Select>
                  </FormControl>
                  <FormControl sx={{ width: "50%" }}>
                    <Typography sx={{ mb: 0.75 }}>Content Type</Typography>

                    <Select
                      value={filterValues.contentType}
                      sx={{
                        bgcolor: "white",
                        paddingLeft: 1,
                        borderRadius: "2px",
                        minWidth: "150px",
                      }}
                      variant="standard"
                      onChange={onFilterChange}
                      inputProps={{
                        name: "contentType",
                        id: "content-type",
                      }}
                    >
                      {mapLabels(
                        Object.entries(contentTypeLabels),
                        MenuItem,
                        "content"
                      )}
                    </Select>
                  </FormControl>
                </Stack>

                <Stack
                  direction="row"
                  alignItems="center"
                  sx={{
                    gap: "32px",

                    "@media screen and (min-width: 900px) and (max-width: 1100px)":
                      {
                        flexDirection: "column-reverse",
                        alignItems: "flex-end",
                        gap: "0",
                      },
                  }}
                >
                  <FormControl
                    sx={{
                      display: "flex",
                      flexDirection: "column",

                      "& .MuiFormControlLabel-label": {},
                    }}
                  >
                    <FormControlLabel
                      control={
                        <SwitchTextTrack
                          name="includeSelf"
                          variant="standard"
                          checked={filterValues.includeSelf}
                          onChange={onCheckChange}
                        />
                      }
                      label="Include Emails to self"
                      sx={{
                        "@media screen and (min-width: 900px) and (max-width: 1100px)":
                          {
                            marginRight: "0",
                          },
                      }}
                    />
                  </FormControl>
                </Stack>
              </Stack>

              {isFetching ? (
                <Box
                  display="flex"
                  justifyContent="center"
                  alignItems="center"
                  width="100%"
                  height="50vh"
                >
                  <CircularProgress sx={{ color: "white" }} />
                </Box>
              ) : (
                <>
                  <TableContainer
                    component={Paper}
                    sx={{
                      margin: "auto",
                      // maxHeight: "55vh",
                      maxHeight: "61vh",
                      backgroundColor: "inherit",
                      color: "#d9d9d9",
                      boxShadow: "none",

                      "& .MuiPaper-root": {
                        "@media screen and (min-width: 901px) and (max-width: 1000px)":
                          {
                            padding: "0",
                          },
                      },
                      "&::-webkit-scrollbar": {
                        "@media screen and (min-width: 901px) and (max-width: 1000px)":
                          {
                            // display: "none",
                          },
                      },
                    }}
                  >
                    <Table
                      stickyHeader
                      sx={{
                        minWidth: 650,
                        borderCollapse: "collapse",
                        borderSpacing: "0",

                        "& .MuiTableRow-root th:first-of-type": {
                          borderTopLeftRadius: "10px",
                          borderBottomLeftRadius: "10px",
                        },
                        "& .MuiTableRow-root th:last-child": {
                          borderTopRightRadius: "10px",
                          borderBottomRightRadius: "10px",
                        },

                        "& .MuiTableCell-root": {
                          // background: "blue",
                          padding: "0",
                          paddingTop: "10px",
                        },
                      }}
                      aria-label="simple table"
                    >
                      <TableHead sx={{ fontWeight: "600" }}>
                        <TableRow
                          sx={{
                            "& .MuiTableCell-root": {
                              bgcolor: "#CCCCCC",

                              paddingTop: "16px",
                              paddingBottom: "16px",
                              paddingLeft: "16px",
                              paddingRight: "0px",
                              marginBottom: "10px",

                              borderBottom: "none",
                              fontWeight: "bold",
                            },
                          }}
                        >
                          <TableCell
                            sx={{
                              // width: "10%",
                              width: "auto",
                            }}
                            component="th"
                            sortDirection={
                              orderBy === "vaultId" ? order : false
                            }
                          >
                            <TableSortLabel
                              active={orderBy === "vaultId"}
                              onClick={createSortHandler("vaultId")}
                              direction={orderBy !== "vaultId" ? "desc" : order}
                              IconComponent={KeyboardArrowDownIcon}
                            >
                              {/* {getString("S_ID")} */}
                              ID
                            </TableSortLabel>
                          </TableCell>
                          <TableCell
                            sx={{
                              width: "30%",
                            }}
                            sortDirection={orderBy === "title" ? order : false}
                          >
                            <TableSortLabel
                              active={orderBy === "title"}
                              onClick={createSortHandler("title")}
                              direction={orderBy !== "title" ? "desc" : order}
                              IconComponent={KeyboardArrowDownIcon}
                            >
                              {/* {getString("S_TITLE")} */}
                              Title
                            </TableSortLabel>
                          </TableCell>
                          <TableCell
                            sx={{
                              // maxWidth: "7%",
                              // width: "5%",
                              width: "auto",
                              lineHeight: "18px",
                            }}
                            sortDirection={
                              orderBy === "contentType" ? order : false
                            }
                          >
                            <TableSortLabel
                              active={orderBy === "contentType"}
                              onClick={createSortHandler("contentType")}
                              direction={
                                orderBy !== "contentType" ? "desc" : order
                              }
                              IconComponent={KeyboardArrowDownIcon}
                            >
                              {/* {getString("S_TYPE")} */}
                              Type
                            </TableSortLabel>
                          </TableCell>
                          <TableCell
                            sx={{
                              // width: "5%",
                              width: "auto",

                              // width: "10%",
                              lineHeight: "18px",
                            }}
                            sortDirection={
                              orderBy === "dateShared" ? order : false
                            }
                          >
                            <TableSortLabel
                              active={orderBy === "dateShared"}
                              onClick={createSortHandler("dateShared")}
                              direction={
                                orderBy !== "dateShared" ? "desc" : order
                              }
                              IconComponent={KeyboardArrowDownIcon}
                            >
                              {/* {getString("S_DATE_SHARED")} */}
                              Date Shared
                            </TableSortLabel>
                          </TableCell>
                          <TableCell
                            sx={{
                              width: "25%",
                              lineHeight: "18px",
                            }}
                          >
                            <TableSortLabel
                              active={orderBy === "recipients"}
                              onClick={createSortHandler("recipients")}
                              direction={
                                orderBy !== "recipients" ? "desc" : order
                              }
                              IconComponent={KeyboardArrowDownIcon}
                            >
                              {/* {getString("S_RECIPIENTS")} */}
                              Recipient(s)
                            </TableSortLabel>
                          </TableCell>
                          <TableCell
                            sx={{
                              // width: "10%",
                              width: "auto",

                              lineHeight: "18px",
                              paddingRight: "8px",
                            }}
                            component="th"
                          >
                            <TableSortLabel
                              active={orderBy === "lastViewed"}
                              onClick={createSortHandler("lastViewed")}
                              direction={
                                orderBy !== "lastViewed" ? "desc" : order
                              }
                              IconComponent={KeyboardArrowDownIcon}
                            >
                              Viewed by Customer
                              {/* {getString("S_VIEWED_BY_CUSTOMER")} */}
                            </TableSortLabel>
                          </TableCell>
                        </TableRow>
                      </TableHead>

                      <TableBody>
                        {visibleRows.map((row, index) => {
                          const isItemSelected = isSelected(row.id);
                          const labelId = `enhanced-table-checkbox-${index}`;

                          return (
                            <TableRow
                              key={row.id}
                              selected={isItemSelected}
                              sx={{
                                // color: "#d9d9d9",

                                "& .MuiTableCell-root": {
                                  borderBottom: "none",
                                  color: "inherit",
                                },

                                "& .MuiBox-root": {
                                  bgcolor: "#0e355a",
                                  color: "white",
                                  paddingTop: "16px",
                                  paddingBottom: "16px",
                                  paddingLeft: "16px",
                                  paddingRight: "0px",
                                  height: "52.02px",
                                  width: "100%",
                                  whiteSpace: "nowrap",
                                  overflow: "hidden",
                                  textOverflow: "ellipsis",
                                  borderStyle: "border-box",
                                },
                              }}
                            >
                              <TableCell
                                sx={{
                                  // borderBottom: "none",
                                  // color: "inherit",
                                  width: "10%",
                                  maxWidth: "50px",
                                  // backgroundColor:"red"
                                }}
                                component="th"
                                id={labelId}
                                scope="row"
                              >
                                <Box
                                  sx={{
                                    // bgcolor: "#0e355a",
                                    // color: "white",
                                    // paddingTop: "16px",
                                    // paddingBottom: "16px",
                                    // paddingLeft: "16px",
                                    // paddingRight: "0px",
                                    // height: "52.02px",
                                    // width: "100%",
                                    borderTopLeftRadius: "10px",
                                    borderBottomLeftRadius: "10px",

                                    // whiteSpace: "nowrap",
                                    // overflow: "hidden",
                                    // textOverflow: "ellipsis",
                                    // borderStyle: "border-box",
                                  }}
                                >
                                  {row.vaultId}
                                </Box>
                              </TableCell>
                              <TableCell
                                sx={{
                                  // borderBottom: "none",
                                  // color: "inherit",
                                  width: "30%",
                                  maxWidth: "70px",

                                  // whiteSpace: "nowrap",
                                  // overflow: "hidden",
                                  // textOverflow: "ellipsis",
                                  // borderStyle: "border-box",
                                }}
                              >
                                <Box
                                  sx={{
                                    // bgcolor: "#0e355a",
                                    color: "white",
                                    paddingTop: "16px",
                                    paddingBottom: "16px",
                                    paddingLeft: "16px",
                                    paddingRight: "0px",
                                    height: "52.02px",
                                    width: "100%",

                                    whiteSpace: "nowrap",
                                    overflow: "hidden",
                                    textOverflow: "ellipsis",
                                    borderStyle: "border-box",
                                  }}
                                >
                                  {/* {row.title} */}
                                  {row.title
                                    .split(" ")
                                    .map(
                                      (word) =>
                                        word.charAt(0).toUpperCase() +
                                        word.slice(1)
                                    )
                                    .join(" ")}
                                </Box>
                              </TableCell>
                              <TableCell
                                sx={{
                                  width: "5%",

                                  maxWidth: "50px",
                                }}
                              >
                                <Box
                                  sx={{
                                    bgcolor: "#0e355a",
                                    color: "white",
                                    paddingTop: "16px",
                                    paddingBottom: "16px",
                                    paddingLeft: "16px",
                                    paddingRight: "0px",
                                    height: "52.02px",

                                    width: "100%",

                                    whiteSpace: "nowrap",
                                    overflow: "hidden",
                                    textOverflow: "ellipsis",
                                    borderStyle: "border-box",
                                  }}
                                >
                                  {row.contentType}
                                </Box>
                              </TableCell>
                              <TableCell
                                sx={{
                                  borderBottom: "none",
                                  color: "inherit",
                                  width: "10%",

                                  whiteSpace: "nowrap",
                                  overflow: "hidden",
                                  textOverflow: "ellipsis",
                                  borderStyle: "border-box",
                                }}
                              >
                                <Box
                                  sx={{
                                    bgcolor: "#0e355a",
                                    color: "white",
                                    paddingTop: "16px",
                                    paddingBottom: "16px",
                                    paddingLeft: "16px",
                                    paddingRight: "0px",
                                    height: "52.02px",
                                    width: "100%",

                                    whiteSpace: "nowrap",
                                    overflow: "hidden",
                                    textOverflow: "ellipsis",
                                    borderStyle: "border-box",
                                  }}
                                >
                                  {row.dateShared}
                                </Box>
                              </TableCell>
                              <TableCell
                                sx={{
                                  borderBottom: "none",
                                  color: "inherit",
                                  maxWidth: 25,
                                  width: "25%",

                                  whiteSpace: "nowrap",
                                  overflow: "hidden",
                                  textOverflow: "ellipsis",
                                  borderStyle: "border-box",
                                }}
                              >
                                <Box
                                  sx={{
                                    bgcolor: "#0e355a",
                                    color: "white",
                                    paddingTop: "16px",
                                    paddingBottom: "16px",
                                    paddingLeft: "16px",
                                    paddingRight: "0px",
                                    height: "52.02px",
                                    width: "100%",

                                    whiteSpace: "nowrap",
                                    overflow: "hidden",
                                    textOverflow: "ellipsis",
                                    borderStyle: "border-box",
                                  }}
                                >
                                  {row.recipients}
                                </Box>
                              </TableCell>
                              <TableCell
                                sx={{
                                  borderBottom: "none",
                                  color: "inherit",
                                  width: "10%",
                                  paddingRight: "8px",

                                  whiteSpace: "nowrap",
                                  overflow: "hidden",
                                  textOverflow: "ellipsis",
                                  borderStyle: "border-box",
                                }}
                                component="th"
                              >
                                <Box
                                  sx={{
                                    bgcolor: "#0e355a",
                                    color: "white",
                                    paddingTop: "16px",
                                    paddingBottom: "16px",
                                    paddingLeft: "16px",
                                    // paddingRight: "0px",

                                    height: "52.02px",
                                    width: "100%",
                                    borderTopRightRadius: "10px",
                                    borderBottomRightRadius: "10px",

                                    whiteSpace: "nowrap",
                                    overflow: "hidden",
                                    textOverflow: "ellipsis",
                                    borderStyle: "border-box",
                                  }}
                                >
                                  {row.lastViewed}
                                </Box>
                              </TableCell>
                            </TableRow>
                          );
                        })}

                        {emptyRows > 0 && (
                          <TableRow
                            style={{
                              height: 53 * emptyRows,
                            }}
                          >
                            <TableCell
                              colSpan={6}
                              sx={{ borderBottom: "none" }}
                            />
                          </TableRow>
                        )}
                      </TableBody>
                    </Table>
                  </TableContainer>
                  <TablePagination
                    sx={{
                      color: "#d9d9d9",

                      borderTop: "none",
                      button: { color: "#d9d9d9" },

                      "& .MuiTablePagination-displayedRows": {
                        display: "none",
                      },
                      "& .MuiTablePagination-selectIcon": {
                        color: "#005FA9",
                      },
                    }}
                    component="div"
                    count={itemsYouShared.length}
                    rowsPerPage={rowsPerPage}
                    page={page}
                    rowsPerPageOptions={[
                      { label: "50 rows", value: 50 },
                      { label: "100 rows", value: 100 },
                      { label: "All rows", value: -1 },
                    ]}
                    slotProps={{
                      select: {
                        inputProps: {
                          "aria-label": "rows per page",
                        },
                        native: true,
                      },
                    }}
                    onPageChange={handleChangePage}
                    onRowsPerPageChange={handleChangeRowsPerPage}
                    ActionsComponent={TablePaginationActions}
                  />
                </>
              )}
            </Box>
          </Box>
        </Desktop>
      </Box>
    </>
  );
};

export default DataPage;
