import React, { useEffect, useState } from "react";
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
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
} from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import { muiColors } from "./constants";
import type { SelectChangeEvent } from "@mui/material";
import { useSearchParams } from "react-router";
import {
  requestSkillList,
  getCategories,
  addNewSkills,
  addMySkills,
} from "../service/api";
import type { Skill, Categories } from "../types/types";

const Tailoredpage: React.FC = () => {
  const [searchParams] = useSearchParams();
  const [skillsList, setSkillsList] = useState<Skill[]>();
  const [anchorEl, setAnchorEl] = useState<HTMLElement | null>(null);
  const [selectedItemId, setSelectedItemId] = useState<string>("");
  const [filter, setFilter] = useState("");
  const [keyword, setKeyword] = useState("");
  const [skillCate, setSkillCate] = useState<Categories[]>();

  //Add new skills Modal
  const [openDialog, setOpenDialog] = useState(false);
  const [newSkillType, setNewSkillType] = useState("");
  const [newSkillName, setNewSkillName] = useState("");

  const handleClick = (event: React.MouseEvent<HTMLElement>, item: string) => {
    setAnchorEl(event.currentTarget);
    setSelectedItemId(item);
  };
  const getSkillsListFirst = () => {
    const keywords = searchParams.get("keywords");
    if (keywords) {
      setKeyword(keywords);
    }
    getSkillsList({
      keyword,
    });
  };

  const handleApply = () => {
    console.log({
      keyword,
      filter,
    });
    getSkillsList({
      keyword,
      filter,
    });
  };

  const handleClose = () => {
    setAnchorEl(null);
    setSelectedItemId("");
  };

  const handleClickAddIntetrets = async () => {
    console.log(selectedItemId);
    //submit data and refesh page
    try {
      const data = await addMySkills({
        type: "wanted",
        skillId: selectedItemId,
      });
      console.log(data);
    } catch (error) {
      console.log(error);
    }
  };

  const handleClickAddMySkills = async () => {
    console.log(selectedItemId);
    //submit data and refresh page
    try {
      const data = await addMySkills({
        type: "owned",
        skillId: selectedItemId,
      });
      console.log(data);
    } catch (error) {
      console.log(error);
    }
  };
  const handleFilterChange = (e: SelectChangeEvent<string>) => {
    setFilter(e.target.value);
  };

  const handleOpenDialog = () => setOpenDialog(true);
  const handleCloseDialog = () => {
    setOpenDialog(false);
    setNewSkillName("");
    setNewSkillType("");
  };
  const handleConfirmAddSkill = async () => {
    console.log("New skill:", {
      category: newSkillType,
      skillName: newSkillName,
    });
    try {
      const data = await addNewSkills({
        category: newSkillType,
        skillName: newSkillName,
      });
      console.log(data);
    } catch (error) {
      console.log(error);
    }
    //submit data
    handleCloseDialog();
  };

  const open = Boolean(anchorEl);
  const getSkillsList = async (params: object) => {
    try {
      const data = await requestSkillList({ ...params });
      setSkillsList(data as unknown as Skill[]);
      console.log(data);
    } catch (error) {
      console.log(error);
    }
  };
  const getCategoriesList = async () => {
    try {
      const data = await getCategories();
      setSkillCate(data as unknown as Categories[]);
      console.log(data);
    } catch (error) {
      console.log(error);
    }
  };
  const getRandomColor = () => {
    return muiColors[Math.floor(Math.random() * muiColors.length)];
  };
  useEffect(() => {
    getSkillsListFirst();
    getCategoriesList();
  }, []);

  return (
    <Container sx={{ height: "90vh", position: "relative" }}>
      {/* filter form */}
      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          gap: 2,
          p: 2,
          flexWrap: "wrap",
        }}
      >
        {/* search */}
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

        {/* Filters */}
        <FormControl sx={{ minWidth: 180 }} size="small">
          <InputLabel>Filter</InputLabel>
          <Select
            value={filter}
            label="Filters"
            onChange={handleFilterChange}
            sx={{
              borderRadius: 5,
            }}
          >
            <MenuItem value="">None</MenuItem>
            {skillCate?.map((item) => (
              <MenuItem value={item.name}>{item.name}</MenuItem>
            ))}
          </Select>
        </FormControl>

        {/* Apply */}
        <Button
          variant="contained"
          color="primary"
          onClick={handleApply}
          sx={{
            px: 3,
            py: 1,
            fontWeight: "bold",
            textTransform: "none",
          }}
        >
          Apply
        </Button>
      </Box>

      {/* display by categories */}
      <Box sx={{ p: 3, height: "80vh", overflowY: "auto" }}>
        {skillsList?.map((cat) => (
          <Box key={cat.name} sx={{ mb: 4 }}>
            <Chip
              label={cat.name}
              sx={{
                bgcolor: getRandomColor(),
                color: "white",
                fontWeight: "bold",
                fontSize: 16,
                boxShadow: 1,
                mb: 2,
              }}
            />
            <Stack direction="row" flexWrap="wrap" gap={1}>
              {cat.skills.map((item) => (
                <Chip
                  key={item.id}
                  label={item.name}
                  clickable
                  onClick={(e) => handleClick(e, item.name)}
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

        {/* 弹出选择菜单 */}
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
          <Box sx={{ p: 1, textAlign: "center", width: 200 }}>
            <Button
              sx={{ cursor: "pointer", textTransform: "none" }}
              onClick={handleClickAddIntetrets}
            >
              Add to My Interests
            </Button>
            <Divider sx={{ my: 1 }} />
            <Button
              sx={{ fcursor: "pointer", textTransform: "none" }}
              onClick={handleClickAddMySkills}
            >
              Add to My Talents
            </Button>
          </Box>
        </Popover>
      </Box>

      {/* 右下角悬浮提示 */}
      <Box
        sx={{
          position: "fixed",
          bottom: 20,
          right: 20,
          bgcolor: "white",
          border: "1px solid #ccc",
          borderRadius: 2,
          boxShadow: 3,
          p: 2,
          textAlign: "center",
        }}
      >
        <Typography variant="body1" fontWeight="bold">
          Can't find my interests?
        </Typography>
        <Typography variant="body2" sx={{ mt: 0.5 }}>
          Try to{" "}
          <Typography
            component="span"
            sx={{
              color: "primary.main",
              textDecoration: "underline",
              cursor: "pointer",
            }}
            onClick={handleOpenDialog}
          >
            add
          </Typography>{" "}
          your new Skills
        </Typography>
      </Box>

      {/* Add new Skills Modal */}
      <Dialog
        open={openDialog}
        onClose={handleCloseDialog}
        fullWidth
        maxWidth="xs"
      >
        <DialogTitle component="div">
          <Typography variant="h4">Add new Skills</Typography>
          <Divider sx={{ p: 1 }} />
        </DialogTitle>
        <DialogContent
          sx={{
            display: "flex",
            flexDirection: "column",
            gap: 2,
            height: "160px",
          }}
        >
          <FormControl fullWidth sx={{ mt: 2 }}>
            <InputLabel id="type-label">Categories</InputLabel>
            <Select
              labelId="type-label"
              value={newSkillType}
              onChange={(e) => setNewSkillType(e.target.value)}
              label="Type"
            >
              {skillCate?.map((item) => (
                <MenuItem id={item.name} value={item.name}>
                  {item.name}
                </MenuItem>
              ))}
            </Select>
          </FormControl>

          <TextField
            label="Skill"
            placeholder="Please input your Skill"
            fullWidth
            value={newSkillName}
            onChange={(e) => setNewSkillName(e.target.value)}
          />
        </DialogContent>

        <DialogActions>
          <Button onClick={handleCloseDialog} variant="outlined">
            Cancel
          </Button>
          <Button
            onClick={handleConfirmAddSkill}
            color="success"
            variant="contained"
          >
            Confirm
          </Button>
        </DialogActions>
      </Dialog>
    </Container>
  );
};

export default Tailoredpage;
