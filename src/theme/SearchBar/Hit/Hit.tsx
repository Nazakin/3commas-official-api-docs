import {InternalDocSearchHit, StoredDocSearchHit} from "@docsearch/react";
import Link from "@docusaurus/Link";

export const Hit = ({
                 hit,
                 children,
             }: {
    hit: InternalDocSearchHit | StoredDocSearchHit;
    children: React.ReactNode;
})=> {
    return <Link to={hit.url}>{children}</Link>;
}