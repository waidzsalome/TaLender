import React, { useState } from "react";
import {
  Container,
  Box,
  Chip,
  Stack,
  Popover,
  Typography,
  Divider,
  Button,
  TextField,
  InputAdornment,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
} from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";

const categories = [
  {
    name: "Sport",
    color: "orange",
    items: ["Football", "Baseball", "Volleyball"],
  },
  {
    name: "Family Work",
    color: "#c47b33",
    items: ["Cooking", "Gardening", "Decorating"],
  },
  {
    name: "Art",
    color: "green",
    items: ["Painting", "Singing", "Watercolor Painting"],
  },
];

const Tailoredpage: React.FC = () => {
  const [anchorEl, setAnchorEl] = useState<HTMLElement | null>(null);
  const [selectedItem, setSelectedItem] = useState<string>("");
  const [filter, setFilter] = useState("");
  const [sort, setSort] = useState("");
  const [keyword, setKeyword] = useState("");

  const handleClick = (event: React.MouseEvent<HTMLElement>, item: string) => {
    setAnchorEl(event.currentTarget);
    setSelectedItem(item);
    console.log(selectedItem);
  };
  const handleApply = () => {
    console.log({
      keyword,
      filter,
      sort,
    });
  };

  const handleClose = () => {
    setAnchorEl(null);
    setSelectedItem("");
  };

  const open = Boolean(anchorEl);
  return (
    <Container sx={{ height: "90vh" }}>
      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          gap: 2, // 控制组件之间的间距
          p: 2,
          flexWrap: "wrap", // 小屏自动换行
        }}
      >
        {/* 搜索框 */}
        <FormControl size="small">
          <TextField
            variant="outlined"
            placeholder="Keywords"
            value={keyword}
            onChange={(e) => setKeyword(e.target.value)}
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <SearchIcon sx={{ color: "grey.600" }} />
                </InputAdornment>
              ),
            }}
            sx={{
              width: 200,
              "& .MuiOutlinedInput-root": {
                borderRadius: 5,
              },
            }}
          />
        </FormControl>

        {/* Filters 下拉框 */}
        <FormControl sx={{ minWidth: 150 }} size="small">
          <InputLabel>Filters</InputLabel>
          <Select
            value={filter}
            label="Filters"
            onChange={(e) => setFilter(e.target.value)}
            sx={{
              borderRadius: 5,
            }}
          >
            <MenuItem value="sport">Sport</MenuItem>
            <MenuItem value="family">Family Work</MenuItem>
            <MenuItem value="art">Art</MenuItem>
          </Select>
        </FormControl>

        {/* Sort By 下拉框 */}
        <FormControl sx={{ minWidth: 150 }} size="small">
          <InputLabel>Sort by</InputLabel>
          <Select
            value={sort}
            label="Sort by"
            onChange={(e) => setSort(e.target.value)}
            sx={{
              borderRadius: 5,
            }}
          >
            <MenuItem value="name">Name</MenuItem>
            <MenuItem value="popularity">Popularity</MenuItem>
            <MenuItem value="newest">Newest</MenuItem>
          </Select>
        </FormControl>

        {/* Apply 按钮 */}
        <Button
          variant="contained"
          color="primary"
          onClick={handleApply}
          sx={{
            px: 3,
            py: 1,
            fontWeight: "bold",
            borderRadius: 3,
            textTransform: "none",
          }}
        >
          Apply
        </Button>
      </Box>
      <Box sx={{ p: 3 }}>
        {categories.map((cat) => (
          <Box key={cat.name} sx={{ mb: 4 }}>
            {/* 分类标题 */}
            <Chip
              label={cat.name}
              sx={{
                bgcolor: cat.color,
                color: "white",
                fontWeight: "bold",
                fontSize: 16,
                boxShadow: 1,
                mb: 2,
              }}
            />

            {/* 分类内容 */}
            <Stack direction="row" flexWrap="wrap" gap={1}>
              {cat.items.map((item) => (
                <Chip
                  key={item}
                  label={item}
                  clickable
                  onClick={(e) => handleClick(e, item)}
                  variant="outlined"
                  sx={{
                    borderColor: "grey.400",
                    boxShadow: 1,
                    fontWeight: 500,
                    fontSize: 15,
                    textTransform: "capitalize",
                    bgcolor: "white",
                  }}
                />
              ))}
            </Stack>
          </Box>
        ))}

        {/* 弹出操作框 */}
        <Popover
          open={open}
          anchorEl={anchorEl}
          onClose={handleClose}
          anchorOrigin={{
            vertical: "bottom",
            horizontal: "center",
          }}
          transformOrigin={{
            vertical: "top",
            horizontal: "center",
          }}
        >
          <Box sx={{ p: 2, textAlign: "center", width: 200 }}>
            <Typography sx={{ fontWeight: 500 }}>
              Add to My Interests
            </Typography>
            <Divider sx={{ my: 1 }} />
            <Typography sx={{ fontWeight: 500 }}>Add to My Skills</Typography>
          </Box>
        </Popover>
      </Box>
    </Container>
  );
};

export default Tailoredpage;
