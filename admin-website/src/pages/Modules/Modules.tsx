import { useIsFetching } from "@tanstack/react-query";
import React, { useState } from "react";
import PageTabs from "@/components/Page/PageTabs";
import PageName from "@/components/Page/PageName";
import Page from "@/components/Page/Page";

const MODULE_PAGE = {
  HOME: 'home',
} as const

type MODULE_PAGE = typeof MODULE_PAGE[keyof typeof MODULE_PAGE]

const Home = React.lazy(() => import('./components/Home'))

const Modules: React.FC = () => {
  const isFetching = useIsFetching()

  const pageTabs = [
    { name: '首页管理', value: MODULE_PAGE.HOME },
  ]
  const [modulePage, setModulePage] = useState<MODULE_PAGE>(MODULE_PAGE.HOME)
  return <>
    <Page
      label={<PageName name='页面管理' isLoading={!!isFetching} />}
      header={
        <div className='w-full flex flex-row justify-between'>
          <PageTabs
            options={pageTabs}
            defaultValue={modulePage}
            onValueChange={(v) => setModulePage(v as MODULE_PAGE)}
          />
        </div>
      }
    >
      {
        modulePage === MODULE_PAGE.HOME &&
        <Home page={MODULE_PAGE.HOME} currentPage={modulePage} />
      }
    </Page>
  </>
}

export default Modules
