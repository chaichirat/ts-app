import { Avatar, Box, ButtonBase, Badge, type BadgeProps } from "@mui/material";
import { styled } from "@mui/system";
import CameraAltIcon from "@mui/icons-material/CameraAlt";
import { makeField } from "./tool";
import { useCallback } from "react";

type IImageFieldProps = {
  value?: string;
  onChange: (value: string) => void;
};

const StyledBadge = styled(Badge)<BadgeProps>(() => ({
  "& .MuiBadge-badge": {
    right: 12,
    bottom: 8,
  },
}));

export const ImageField = makeField((props: IImageFieldProps) => {
  const { value, onChange } = props;

  const handleAvatarChange = useCallback(
    (event: React.ChangeEvent<HTMLInputElement>) => {
      const file = event.target.files?.[0];
      if (file) {
        const reader = new FileReader();
        reader.onload = () => {
          onChange(reader.result as string);
        };
        reader.readAsDataURL(file);
      }
      event.target.value = "";
    },
    []
  );

  return (
    <Box display="flex" justifyContent="center" width="100%">
      <ButtonBase
        component="label"
        tabIndex={-1}
        sx={{
          borderRadius: "40px",
          "&:has(:focus-visible)": {
            outline: "2px solid",
            outlineOffset: "2px",
          },
        }}
      >
        <StyledBadge
          anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
          badgeContent={<CameraAltIcon />}
          sx={{ color: "black" }}
        >
          <Avatar src={value} sx={{ width: 100, height: 100 }} />
          <input
            type="file"
            accept="image/*"
            style={{
              border: 0,
              clip: "rect(0 0 0 0)",
              height: "1px",
              margin: "-1px",
              overflow: "hidden",
              padding: 0,
              position: "absolute",
              whiteSpace: "nowrap",
              width: "1px",
            }}
            onChange={handleAvatarChange}
          />
        </StyledBadge>
      </ButtonBase>
    </Box>
  );
});
