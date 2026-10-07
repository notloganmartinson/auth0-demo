# Local image assets

Created specifically for this fictional storefront using the built-in imagegen tool. No external stock-photo dependency, licensed retail branding, or runtime network request to an image host is used.

- `public/images/campaign.png`: original generated autumn campaign; used by the hero and category crops.
- `public/images/catalog.png`: original generated 4-column, 3-row catalog contact sheet. `src/components/product-image.tsx` selects each cell using CSS background position. Product `imageIndex` values correspond to row-major cell order. A future individual-photo catalog can replace that component and each product's `image` field.

## Campaign prompt

Use case: photorealistic-natural. Create a premium clothing retailer autumn campaign photograph, wide landscape 1536x1024. Two stylish adult models, a woman in an oversized oatmeal knit sweater and black tailored trousers, and a man in a moss olive cotton overshirt over a white tee with sand trousers. They walk along a sunlit weathered warm beige concrete architectural wall, long late afternoon shadows, dry grass, quiet coastal modernist setting. Editorial analog fashion photography, natural skin textures, understated candid confident pose. Full body or three-quarter body, models concentrated on right half, left third mostly quiet wall for white overlay text added by website. Premium but approachable everyday clothing. Earthy colors, beautiful directional light. No typography, no logos, no watermarks.

## Catalog prompt

Use case: product-mockup. Create ONE catalog contact sheet with exactly 4 columns and 3 rows of equal-size rectangular panels, absolutely no gutters, no borders. 1536x1536 square overall. Each of twelve cells is a beautiful professional photorealistic flat-lay product photograph of exactly one clothing piece on identical warm light gray background, with soft studio shadows and fine fabric texture. Each item centered with generous margins inside its own cell, no overlapping cell edges, no text or logos. Row 1 left to right: olive green collared button-front overshirt; oatmeal cable knit crewneck sweater; washed black straight leg jeans; ivory short sleeve heavyweight T-shirt. Row 2 left to right: beige trench coat; dark navy crewneck sweatshirt; light blue oxford button-down shirt; tan wide-leg tailored trousers. Row 3 left to right: charcoal ribbed beanie hat; olive canvas tote bag with two handles; cream ribbed cardigan with brown buttons; dark navy casual drawstring shorts. Twelve distinct cells exactly as specified. High-end ecommerce still life, realistic cotton wool canvas textures, clothing laid flat gracefully, no people, no accessories other than the specified items.
