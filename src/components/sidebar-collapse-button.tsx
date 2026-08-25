'use client';

import { Sidebar } from 'lucide-react';
import { buttonVariants } from 'fumadocs-ui/components/ui/button';
import { useNotebookLayout } from 'fumadocs-ui/layouts/notebook';

export function SidebarCollapseButton() {
  const { slots } = useNotebookLayout();
  const CollapseTrigger = slots.sidebar.collapseTrigger;

  return (
    <CollapseTrigger
      className={buttonVariants({
        color: 'ghost',
        className:
          'absolute top-1/2 start-[calc(var(--fd-sidebar-width)-3rem-1px)] size-8 -translate-y-1/2 p-0 text-fd-muted-foreground max-md:hidden [&_svg]:size-4',
      })}
    >
      <Sidebar />
    </CollapseTrigger>
  );
}
