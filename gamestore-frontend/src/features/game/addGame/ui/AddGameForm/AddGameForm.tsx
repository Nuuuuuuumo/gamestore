import {Controller, useForm} from "react-hook-form";
import {
  Box,
  Button,
  Chip,
  FormControl,
  FormHelperText,
  IconButton,
  InputLabel,
  MenuItem,
  OutlinedInput,
  Paper,
  Select,
  Switch,
  TextField,
  Typography,
  useTheme,
} from "@mui/material";
import {yupResolver} from "@hookform/resolvers/yup";
import {enqueueSnackbar} from "notistack";
import {useNavigate} from "react-router-dom";

import CloudUploadIcon from "@mui/icons-material/CloudUpload";

import ImageIcon from "@mui/icons-material/Image";

import {ChangeEvent, useRef, useState} from "react";

import {useSelector} from "react-redux";

import {useAddGameMutation, useGetGenresAndPlatformsQuery} from "@/entities/game/api/gameAPi";
import {AddGameSchema, addGameSchema} from "@/features/game/addGame/model/addGameSchema";
import {RequestAddGameData} from "@/entities/game/model/types";

const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;
const MenuProps = {
  PaperProps: {
    style: {
      maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
      width: 250,
    },
  },
};

export const AddGameForm = () => {
  const [addGameMutation, {error: mutationError, isLoading: isAddGamePending}] = useAddGameMutation();
  const {data} = useGetGenresAndPlatformsQuery();
  const navigate = useNavigate();
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [selectedFileName, setSelectedFileName] = useState("");
  
  const theme = useTheme();
  
  const mode = useSelector((state: RootState) => state.theme.mode);
  const bgColor = mode === "dark" ? "#8B5CF6" : "#141414";
  
  const {
    formState: {errors},
    control,
    handleSubmit,
    register,
    setValue,
  } = useForm<AddGameSchema>({
    resolver: yupResolver(addGameSchema),
    mode: "onChange",
  });
  
  
  const onSubmitHandler = async (data: RequestAddGameData) => {
    const {image, ...rest} = data;
    const formData = new FormData();
    formData.append("data", JSON.stringify(rest));
    formData.append("image", image[0]);
    await addGameMutation(formData)
      .unwrap()
      .then((payload) => {
        enqueueSnackbar(`Game ${payload.title} successfully added.`, {variant: "success"});
        navigate("/");
      })
      .catch(() => enqueueSnackbar("An error occurred.", {variant: "error"}));
  };
  
  const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      setSelectedFileName(e.target.files[0].name);
      setValue("image", e.target.files);
    } else {
      setSelectedFileName("");
    }
  };
  
  const triggerFileInput = () => {
    if (fileInputRef.current) {
      fileInputRef.current.click();
    }
  };
  
  return (
    <>
      <form encType="multipart/form-data" style={{maxWidth: "900px", width: "100%"}}
        onSubmit={handleSubmit(onSubmitHandler)}>
        <FormControl fullWidth sx={{m: 2}}>
          <TextField
            {...register("title")}
            label="Title"
            variant="outlined"
            fullWidth
            error={!!errors.title || !!mutationError}
            helperText={errors.title?.message}
          />
        </FormControl>
        <FormControl fullWidth sx={{m: 2}}>
          <TextField
            {...register("price", {valueAsNumber: true})}
            label="Price"
            type="number"
            inputProps={{
              step: "any",
            }}
            variant="outlined"
            fullWidth
            defaultValue={0}
            error={!!errors.price || !!mutationError}
            helperText={errors.price?.message}
            InputProps={{
              startAdornment: <Typography>$</Typography>,
            }}
          />
        </FormControl>
        <FormControl fullWidth sx={{m: 2}}>
          <TextField
            {...register("description")}
            label="Description"
            variant="outlined"
            fullWidth
            error={!!errors.description || !!mutationError}
            helperText={errors.description?.message}
          />
        </FormControl>
        <FormControl fullWidth sx={{m: 2}} error={!!errors.genres}>
          <InputLabel id="genres-label">Genres</InputLabel>
          <Controller
            defaultValue={[]}
            name="genres"
            control={control}
            render={({field}) => (
              <Select
                multiple
                fullWidth
                {...field}
                labelId="genres-label"
                id="genres-select"
                label="Genres"
                input={<OutlinedInput label="Genres"/>}
                renderValue={(selected) => (
                  <Box sx={{display: "flex", flexWrap: "wrap", gap: 0.5}}>
                    {selected.map((value) => (
                      <Chip key={value} label={data?.genres.find((genre) => genre.id === value)?.name || ""}/>
                    ))}
                  </Box>
                )}
                MenuProps={MenuProps}
              >
                {data?.genres.map((genre) => (
                  <MenuItem
                    key={genre.id}
                    value={genre.id}
                  >
                    {genre.name}
                  </MenuItem>
                ))}
              </Select>
            )}/>
          {errors.genres && (
            <FormHelperText>{errors.genres.message}</FormHelperText>
          )}
        </FormControl>
        <FormControl fullWidth sx={{m: 2}} error={!!errors.platforms}>
          <InputLabel id="platforms-label">Platforms</InputLabel>
          <Controller
            defaultValue={[]}
            name="platforms"
            control={control}
            render={({field}) => (
              <Select
                multiple
                fullWidth
                {...field}
                labelId="platforms-label"
                id="platforms-select"
                label="Platforms"
                input={<OutlinedInput label="Platforms"/>}
                renderValue={(selected) => (
                  <Box sx={{display: "flex", flexWrap: "wrap", gap: 0.5}}>
                    {selected.map((value) => (
                      <Chip key={value} label={data?.platforms.find((platform) => platform.id === value)?.name || ""}/>
                    ))}
                  </Box>
                )}
                MenuProps={MenuProps}
              >
                {data?.platforms.map((platform) => (
                  <MenuItem
                    key={platform.id}
                    value={platform.id}
                  >
                    {platform.name}
                  </MenuItem>
                ))}
              </Select>
            )}/>
          {errors.platforms && (
            <FormHelperText>{errors.platforms.message}</FormHelperText>
          )}
        </FormControl>
        <FormControl fullWidth sx={{m: 2}}>
          <TextField
            {...register("publisher")}
            label="Publisher"
            variant="outlined"
            fullWidth
            error={!!errors.publisher || !!mutationError}
            helperText={errors.publisher?.message}
          />
        </FormControl>
        <FormControl fullWidth sx={{m: 2}}>
          <TextField
            {...register("developer")}
            label="Developer"
            variant="outlined"
            fullWidth
            error={!!errors.developer || !!mutationError}
            helperText={errors.developer?.message}
          />
        </FormControl>
        <FormControl fullWidth sx={{m: 2}}>
          <Typography variant="subtitle1" gutterBottom>
            Game Cover Image
          </Typography>
          <Paper
            elevation={3}
            sx={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              justifyContent: "center",
              padding: 3,
              border: "2px dashed",
              borderColor: errors.image ? "error.main" : "#ccc",
              borderRadius: "8px",
              cursor: "pointer",
              transition: "border-color 0.3s ease",
              "&:hover": {
                borderColor: errors.image ? "error.main" : "#1976d2",
              },
              bgcolor: "background.paper",
            }}
            onClick={triggerFileInput}
          >
            <input
              {...register("image")}
              type="file"
              ref={fileInputRef}
              style={{display: "none"}}
              onChange={handleFileChange}
              accept="image/*"
            />
            
            <IconButton
              sx={{
                bgcolor: errors.image ? "error.light" : "primary.light",
                color: "white",
                mb: 2,
                "&:hover": {
                  bgcolor: errors.image ? "error.main" : "primary.main",
                },
                width: 60,
                height: 60,
              }}
            >
              {selectedFileName ? (<ImageIcon fontSize="large"/>) : <CloudUploadIcon fontSize="large"/>}
            </IconButton>
            
            <Typography variant="body1" align="center" sx={{fontWeight: selectedFileName ? "bold" : "normal"}}>
              {selectedFileName || "Click to upload game cover image"}
            </Typography>
            
            {!selectedFileName && (
              <Typography variant="caption" color="text.secondary" align="center" sx={{mt: 1}}>
                PNG, JPG or GIF, max 10MB
              </Typography>
            )}
          </Paper>
          {errors.image && (
            <Typography color="error" variant="caption" sx={{mt: 1, display: "block"}}>
              {errors.image.message}
            </Typography>
          )}
        
        </FormControl>
        <FormControl fullWidth sx={{m: 2, display: "flex", flexDirection: "row", alignItems: "center"}}>
          <Typography variant="subtitle1" sx={{mr: 2}}>
            Multiplayer Support
          </Typography>
          <Controller
            name="multiplayerSupport"
            control={control}
            defaultValue={false}
            render={({field}) => (
              <Switch
                {...field}
                checked={field.value}
                sx={{
                  "& .MuiSwitch-switchBase": {
                    "&.Mui-checked": {
                      color: theme.palette.secondary.light, // dark green color when checked
                      "& + .MuiSwitch-track": {
                        backgroundColor: bgColor, // light green track when checked
                        opacity: 0.8,
                      },
                    },
                  },
                  "& .MuiSwitch-track": {
                    backgroundColor: "#bdbdbd", // grey track when unchecked
                  },
                  "& .MuiSwitch-thumb": {
                    boxShadow: "0 2px 4px 0 rgba(0,0,0,0.2)",
                  },
                }}
              />
            )}
          />
        </FormControl>
        <Button
          type="submit"
          variant="contained"
          color="primary"
          size="large"
          sx={{
            color: "#fff",
            "&:hover": {
              backgroundColor: "#8375A2FF",
            },
            backgroundColor: bgColor,
          }}
        >
          {isAddGamePending ? "Adding game..." : "Add Game"}
        </Button>
      </form>
    </>
  );
};