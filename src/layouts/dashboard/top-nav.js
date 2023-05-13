import PropTypes from "prop-types";
import NextLink from "next/link";
import QuestionMarkIcon from '@mui/icons-material/QuestionMark';
import AddIcon from '@mui/icons-material/Add';
import { styled } from "@mui/material/styles";
import SearchOutlined from "@mui/icons-material/SearchOutlined";
import { FlexBox } from "../../components/flex-box";
import BellIcon from "@heroicons/react/24/solid/BellIcon";
import UsersIcon from "@heroicons/react/24/solid/UsersIcon";
import Bars3Icon from "@heroicons/react/24/solid/Bars3Icon";
import MagnifyingGlassIcon from "@heroicons/react/24/solid/MagnifyingGlassIcon";
import {
  MenuItem,
  Card,
  TextField,
  Avatar,
  Badge,
  Box,
  IconButton,
  Stack,
  SvgIcon,
  Tooltip,
  useMediaQuery,
} from "@mui/material";
import { alpha } from "@mui/material/styles";
import { Logo } from "src/components/logo";
import { usePopover } from "src/hooks/use-popover";
import { AccountPopover } from "./account-popover";

export const SearchOutlinedIcon = styled(SearchOutlined)(({ theme }) => ({
  color: "#D4D0D0",
  background:"#E32727",
  width:"80px",
  fontSize:"48px",
  
  padding:"10px",
  borderTopRightRadius: 300,
  borderBottomRightRadius: 300,


})); // also used in the GrocerySearchBox component

export const SearchResultCard = styled(Card)(() => ({
  zIndex: 99,
  top: "100%",
  width: "100%",
  position: "absolute",
  paddingTop: "0.5rem",
  paddingBottom: "0.5rem",
}));

const DropDownHandler = styled(FlexBox)(({ theme }) => ({
  whiteSpace: "pre",
  borderRight :"1px solid #CDCCCC",
  // borderLeft: `1px solid ${theme.palette.text.disabled}`,
  [theme.breakpoints.down("xs")]: {
    display: "none",
  },
}));

const SIDE_NAV_WIDTH = 280;
const TOP_NAV_HEIGHT = 64;

export const TopNav = (props) => {
  const { onNavOpen } = props;
  const lgUp = useMediaQuery((theme) => theme.breakpoints.up("lg"));
  const accountPopover = usePopover();
  const [category, setCategory] = useState("");
  const [resultList, setResultList] = useState([]);
  const parentRef = useRef();

  return (
    <>
      <Box
        component="header"
        sx={{
          backdropFilter: "blur(6px)",
          borderBottom: "1px solid #CDD0D2",
          backgroundColor: (theme) => alpha(theme.palette.background.default, 0.8),
          position: "sticky",
          left: {
            lg: `${SIDE_NAV_WIDTH}px`,
          },
          top: 0,
          width: {
            lg: `calc(100% - ${SIDE_NAV_WIDTH}px)`,
          },
          zIndex: (theme) => theme.zIndex.appBar,
        }}
      >
        <Stack
          alignItems="center"
          direction="row"
          justifyContent="space-between"
          spacing={2}
          sx={{
            minHeight: TOP_NAV_HEIGHT,
            px: 2,
          }}
        >
          <Stack alignItems="center" direction="row" spacing={2}>
            <Box
              component={NextLink}
              href="/"
              sx={{
                display: "inline-flex",
                height: 32,
                width: 32,
              }}
            >
              <Logo />
            </Box>
            <Box
              position="relative"
              flex="1 1 0"
              maxWidth="670px"
              mx="auto"
              
            >
              <TextField
                //   sx={{
                //   'input': {
                //     '&::placeholder': {
                //       textOverflow: 'ellipsis !important',
                //       color: 'blue'
                //      }
                // }}
                fullWidth
                variant="outlined"
                placeholder="Search Products"
                // onChange={hanldeSearch}
                //   InputLabelProps={{
                //     style: { color: 'red' },
                //  }}
                InputProps={{
                  sx: {
                    height: 44,
                    paddingRight: 0,
                    border: "1px solid",
                    borderRadius: 300,
                    color: "grey.600",
                    overflow: "hidden",
                    "&:hover .MuiOutlinedInput-notchedOutline": {
                      borderColor: "primary.main",
                    },
                    input: {
                      "&::placeholder": {
                        //  textOverflow: 'ellipsis !important',
                        //  textAlign:"left"
                        paddingLeft: "20px",
                      },
                    },
                  },
                  endAdornment: (
                    <SearchOutlinedIcon
                      onClick={() => {
                        handleSearch();
                      }}
                    />
                  ),
                  // startAdornment: categoryDropdown,
                }}
              />

              {/* {!!resultList.length && ( */}
                <SearchResultCard elevation={2}>
                  {/* {resultList.map((item) => ( */}
                    {/* <Link href={`/product/search/${item}`} key={item} passHref> */}
                    <MenuItem >All</MenuItem>
                    {/* </Link> */}
                  {/* ))} */}
                </SearchResultCard>
              {/* )} */}
            </Box>
          </Stack>
          <Stack alignItems="center" direction="row" spacing={2}>
            {/* <Tooltip title="Contacts">
              <IconButton>
                <SvgIcon fontSize="small">
                  <UsersIcon />
                </SvgIcon>
              </IconButton>
            </Tooltip> */}
            <Tooltip title="Notifications">
              <IconButton>
                <Badge badgeContent={4} color="success" variant="dot">
                  <SvgIcon fontSize="small">
                    <BellIcon />
                  </SvgIcon>
                </Badge>
              </IconButton>
            </Tooltip>
            <Tooltip title="Notifications">
              <IconButton>
                  <SvgIcon fontSize="small">
                    <QuestionMarkIcon />
                  </SvgIcon>
              </IconButton>
            </Tooltip>
            <AddIcon
              onClick={accountPopover.handleOpen}
              ref={accountPopover.anchorRef}
              sx={{
                cursor: "pointer",
                height: 30,
                width: 30,
              }}
              src="/assets/avatars/avatar-anika-visser.png"
            />
          </Stack>
        </Stack>
      </Box>
      <AccountPopover
        anchorEl={accountPopover.anchorRef.current}
        open={accountPopover.open}
        onClose={accountPopover.handleClose}
      />
    </>
  );
};

TopNav.propTypes = {
  onNavOpen: PropTypes.func,
};
