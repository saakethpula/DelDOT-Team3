// src/links/entities/link.entity.ts
var Link = class {
  id;
  url;
  title;
  description;
  // Don't really want this, delete this whole file. Just left it in as an example.
  constructor() {
    this.id = 0;
    this.url = "";
    this.title = "";
    this.description = "";
  }
};

// src/links/dto/create-link.dto.ts
var CreateLinkDto = class {
};

// src/links/dto/update-link.dto.ts
import { PartialType } from "@nestjs/mapped-types";
var UpdateLinkDto = class extends PartialType(CreateLinkDto) {
};

// src/index.ts
var links = {
  dto: {
    CreateLinkDto,
    UpdateLinkDto
  },
  entities: {
    Link
  }
};
export {
  links
};
