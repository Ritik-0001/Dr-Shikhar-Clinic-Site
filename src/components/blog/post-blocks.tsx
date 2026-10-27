import { InlineText } from "@/components/ui/inline-text";
import type { Block } from "@/data/blog";

/** Renders an article body. Used by the blog page and by the live preview in the admin editor. */
export function PostBlocks({ blocks }: { blocks: Block[] }) {
  return (
    <>
      {blocks.map((block, i) => {
        switch (block.type) {
          case "h2":
            return <h2 key={i}>{block.text}</h2>;
          case "h3":
            return <h3 key={i}>{block.text}</h3>;
          case "p":
            return (
              <p key={i}>
                <InlineText text={block.text} />
              </p>
            );
          case "ul":
          case "ol": {
            const List = block.type;
            return (
              <List key={i}>
                {block.items.map((item, j) => (
                  <li key={j}>
                    <InlineText text={item} />
                  </li>
                ))}
              </List>
            );
          }
        }
      })}
    </>
  );
}
