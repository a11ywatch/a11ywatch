/*
 * Copyright (c) A11yWatch, LLC. and its affiliates.
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 **/

import React, { FunctionComponent } from "react";
import styled from "styled-components";
import { Card as CardCommon, CardProps } from "../../common";

const CardWrapper: FunctionComponent<CardProps> = ({
  info,
  className,
  title,
  cardImage,
  tags,
}) => (
  <CardCommon
    cardImage={cardImage}
    title={title}
    info={info}
    tags={tags}
    className={className}
  />
);

export const Card = styled(CardWrapper)`
  font-weight: lighter;
  background: teal;
  color: white;
  padding: 12px;
  display: flex;
  flex-direction: column;
`;
