/* eslint-disable react-hooks/exhaustive-deps */
import SearchOutlined from "@mui/icons-material/SearchOutlined";
import { Box, Card, MenuItem, TextField } from "@mui/material";
import TouchRipple from "@mui/material/ButtonBase";
import { styled } from "@mui/material/styles";
import { debounce } from "@mui/material/utils";
import BazarMenu from "components/BazarMenu";
import { FlexBox } from "components/flex-box";
import { useRouter } from 'next/router';
import { useCallback, useEffect, useRef, useState } from "react"; // styled components
// also used in the GrocerySearchBox component
import useLanguage from 'hooks/useLanguage';


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

const SearchBox = ({mainCategories}) => {
  const { push } = useRouter();
  const [category, setCategory] = useState("");
  const [resultList, setResultList] = useState([]);
  const parentRef = useRef();
  // useEffect(()=>{
  //   setCategory(useLanguage("All Categories"))
  // },[])


  const handleSearch = () =>{
    push(`/product/search?${category}`)
    // push({query: {lang:'d' }})
    // push({ path: 'product/search', query: { search: category }})
  }

  const handleCategoryChange = (cat) => () => setCategory(cat);

  const search = debounce((e) => {
    const value = e.target?.value;
    if (!value) setResultList([]);
    else setResultList(mainCategories.map(i=>i.name));
  }, 200);
  const hanldeSearch = useCallback((event) => {
    event.persist();
    search(event);
  }, []);

  const handleDocumentClick = () => setResultList([]);

  useEffect(() => {
    window.addEventListener("click", handleDocumentClick);
    return () => window.removeEventListener("click", handleDocumentClick);
  }, []);
  const categoryDropdown = (
    <BazarMenu
      direction="left"
      sx={{
        zIndex: 1502,
      }}
      handler={
        <DropDownHandler
          px={3}
          gap={0.5}
          height="100%"
          // color="grey.700"
          // bgcolor="grey.100"
          alignItems="center"
          component={TouchRipple}
         
        >  
       {!category && useLanguage("All Categories")}
       
          {category}

          {/* <KeyboardArrowDownOutlined fontSize="small" color="inherit" /> */}
        </DropDownHandler>
      }
    >
      {mainCategories && mainCategories.map((item) => (
        <MenuItem key={item.id} onClick={handleCategoryChange(item?.name)}>
          {item?.name}
        </MenuItem>
      ))}
    </BazarMenu>
  );
  return (
    <Box
      position="relative"
      flex="1 1 0"
      maxWidth="670px"
      mx="auto"
      {...{
        ref: parentRef,
      }}
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
        placeholder={useLanguage("Search Products")}
        onChange={hanldeSearch}
      //   InputLabelProps={{
      //     style: { color: 'red' }, 
      //  }}
        InputProps={{
          sx: {
           
            height: 44,
            paddingRight: 0,
            border:"1px solid",
            borderRadius: 300,
            color: "grey.600",
            overflow: "hidden",
            "&:hover .MuiOutlinedInput-notchedOutline": {
              borderColor: "primary.main",
            },
             'input': {
       '&::placeholder': {
        //  textOverflow: 'ellipsis !important',
          //  textAlign:"left"
           paddingLeft:"20px"
         }}
            
          },
          endAdornment:<SearchOutlinedIcon  onClick={()=>{handleSearch()}}/> ,
          startAdornment: categoryDropdown
        }}
      />

      {!!resultList.length && (
        <SearchResultCard elevation={2}>
          {resultList.map((item) => (
            // <Link href={`/product/search/${item}`} key={item} passHref>
              <MenuItem key={item}>{item}</MenuItem>
            // </Link>
          ))}
        </SearchResultCard>
      )}
    </Box>
  );
};

// const categories = [
//   // "All Categories",
//   "Car",
//   "Clothes",
//   "Electronics",
//   "Laptop",
//   "Desktop",
//   "Camera",
//   "Toys",
// ];
// const dummySearchResult = [
//   "Macbook Air 13",
//   "Asus K555LA",
//   "Acer Aspire X453",
//   "iPad Mini 3",
// ];
export default SearchBox;
