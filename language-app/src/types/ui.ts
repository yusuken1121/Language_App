import React from "react";

// ボタンインナーコンポーネントのProps
export interface ButtonInnerProps {
  children?: React.ReactNode;
  icon?: React.ComponentType<{ className?: string }>;
  label?: string;
  innerIconClassName?: string;
  textClassName?: string;
  className?: string;
}

// テキスト読み上げボタンのProps
export interface TextToSpeechButtonProps {
  text: string;
  className?: string;
}

// フッターコンポーネントのProps
export interface FooterProps {
  className?: string;
}
