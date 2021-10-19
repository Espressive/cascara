import React from 'react';
import AdminStructure from '.';
import { links } from './components/Nav/Nav.fixture';

const longContent = (
  <ul>
    <li>item1</li>
    <li>item2</li>
    <li>item3</li>
    <li>item4</li>
    <li>item5</li>
    <li>item6</li>
    <li>item7</li>
    <li>item8</li>
    <li>item9</li>
    <li>item10</li>
    <li>item11</li>
    <li>item12</li>
    <li>item13</li>
    <li>item14</li>
    <li>item15</li>
    <li>item16</li>
    <li>item17</li>
    <li>item18</li>
    <li>item19</li>
    <li>item20</li>
    <li>item21</li>
    <li>item22</li>
    <li>item23</li>
    <li>item24</li>
    <li>item25</li>
    <li>item26</li>
    <li>item27</li>
    <li>item28</li>
    <li>item29</li>
    <li>item30</li>
    <li>item31</li>
    <li>item32</li>
    <li>item33</li>
    <li>item34</li>
    <li>item35</li>
    <li>item36</li>
    <li>item37</li>
    <li>item38</li>
    <li>item39</li>
    <li>item40</li>
    <li>item41</li>
    <li>item42</li>
    <li>item43</li>
    <li>item44</li>
    <li>item45</li>
    <li>item46</li>
    <li>item47</li>
    <li>item48</li>
    <li>item49</li>
    <li>item50</li>
    <li>item51</li>
    <li>item52</li>
    <li>item53</li>
    <li>item54</li>
    <li>item55</li>
    <li>item56</li>
    <li>item57</li>
    <li>item58</li>
    <li>item59</li>
    <li>item60</li>
    <li>item61</li>
    <li>item62</li>
    <li>item63</li>
    <li>item64</li>
    <li>item65</li>
    <li>item66</li>
    <li>item67</li>
    <li>item68</li>
    <li>item69</li>
    <li>item70</li>
    <li>item71</li>
    <li>item72</li>
    <li>item73</li>
    <li>item74</li>
    <li>item75</li>
    <li>item76</li>
    <li>item77</li>
    <li>item78</li>
    <li>item79</li>
    <li>item80</li>
    <li>item81</li>
    <li>item82</li>
    <li>item83</li>
    <li>item84</li>
    <li>item85</li>
    <li>item86</li>
    <li>item87</li>
    <li>item88</li>
    <li>item89</li>
    <li>item90</li>
    <li>item91</li>
    <li>item92</li>
    <li>item93</li>
    <li>item94</li>
    <li>item95</li>
    <li>item96</li>
    <li>item97</li>
    <li>item98</li>
    <li>item99</li>
    <li>item100</li>
  </ul>
);
const testLogo =
  'https://storage.googleapis.com/pr-newsroom-wp/1/2018/11/Spotify_Logo_RGB_White.png';
const exampleHeader = (
  <AdminStructure.Header logo={testLogo} post={'Hey'} title='Cool Company' />
);
const exampleNav = <AdminStructure.Nav links={links} />;
const exampleTheme = {
  color: {
    primary: '#a00',
    secondary: '#00a',
  },
};

export default {
  components: (
    <AdminStructure header={exampleHeader} nav={exampleNav}>
      <AdminStructure.Main header='Main'>
        <AdminStructure.Drawer>
          <p>I am a drawer</p>
        </AdminStructure.Drawer>
      </AdminStructure.Main>
    </AdminStructure>
  ),
  'no-drawer': (
    <AdminStructure header={exampleHeader} nav={exampleNav}>
      <AdminStructure.Main header='Main'>
        <div>
          Lorem, ipsum dolor sit amet consectetur adipisicing elit. Delectus
          voluptatum eaque vel at laudantium, eligendi nisi exercitationem
          commodi eum ipsum qui veritatis saepe suscipit impedit, quisquam nemo
          aliquam pariatur aspernatur eos amet iusto ex optio perferendis a. Cum
          iste cupiditate non blanditiis eius delectus placeat ut voluptates
          nemo praesentium. Facere sequi ratione in non, velit voluptates
          accusantium cumque iste perspiciatis, alias quidem fuga nobis
          reprehenderit porro! Eaque nam rem, non, soluta at delectus molestiae
          esse consequuntur eveniet, voluptate culpa! Laboriosam deleniti,
          maxime nisi, quidem adipisci quis sapiente culpa eligendi tenetur
          autem facere est omnis. Natus aliquid adipisci quas totam id nemo
          beatae velit, magnam, corporis facilis blanditiis, officiis
          perspiciatis! Ipsum minus saepe temporibus dignissimos consequuntur
          corrupti velit veniam rerum eligendi ullam aspernatur nesciunt non aut
          nihil, facere laborum. Aliquid molestias laboriosam perspiciatis
          mollitia quisquam sed, ut odio voluptates enim, cupiditate minus
          itaque quia quam tempore officiis iusto hic ipsam! Dignissimos dicta
          quas illum, sequi ipsa dolores dolorum quod tempora qui quaerat et
          veritatis labore odio, amet nisi. Porro, et nostrum expedita possimus
          voluptas adipisci perferendis. Nemo similique distinctio quos debitis
          assumenda? Distinctio, similique praesentium sequi quod eveniet non
          quas illum, hic aliquid magni labore fuga incidunt aut pariatur quasi
          sunt cumque modi earum qui dolorum omnis, quam quae! Corrupti illo
          quisquam voluptas doloribus quae similique quam ratione ipsa eligendi
          hic velit omnis odit voluptatibus, nostrum pariatur qui ipsam ea
          incidunt possimus inventore nisi id? Officiis pariatur ullam explicabo
          iste sequi consequatur, sit voluptate numquam fugit, perferendis
          minus, quis expedita. Sit modi perspiciatis, recusandae corporis ut
          expedita vel voluptatem sint necessitatibus odio unde, dolores soluta
          fugit esse sequi, voluptas qui facilis consequuntur. Quo ab deleniti
          maiores. Facere accusantium vitae nesciunt totam vero nulla deserunt
          iste sed possimus, nostrum, necessitatibus molestias ratione. Harum
          incidunt reprehenderit magnam laudantium, mollitia iste labore,
          doloremque nobis laborum beatae praesentium repudiandae aliquam
          impedit in qui obcaecati alias necessitatibus fugit debitis corporis
          sit nesciunt. Quos reprehenderit dolores deleniti, nesciunt commodi
          ipsum doloremque fugiat mollitia aut distinctio similique harum
          molestiae obcaecati sapiente maxime consequatur adipisci laborum
          totam! Facilis illum modi totam, obcaecati dolores unde nam provident
          architecto animi cupiditate error dolor, autem reprehenderit ad
          tempora officiis in laudantium consequuntur. Non, commodi! Itaque
          beatae enim distinctio numquam dolore hic repellat labore pariatur
          accusantium praesentium? Similique cumque cum aperiam voluptate
          quaerat consequatur exercitationem cupiditate saepe doloribus sint
          magni consequuntur facilis eaque doloremque eveniet, provident
          laboriosam accusamus repellat officiis numquam earum vero incidunt.
          Quas nesciunt quam ad ducimus ipsa, perspiciatis sint dignissimos
          cupiditate ratione dicta repellendus aliquid eius iure vel saepe
          totam, mollitia, pariatur placeat odit. Placeat, veritatis molestias?
          Animi inventore facilis provident magni pariatur, consequuntur at
          impedit placeat porro quo suscipit quae! Veritatis velit sapiente quod
          quaerat aliquid expedita eaque quam repudiandae corrupti voluptas
          molestias quidem optio enim laboriosam commodi, illum mollitia? Sequi
          excepturi soluta, in cumque omnis culpa eaque, officiis tempora
          voluptatibus optio ullam, temporibus nesciunt obcaecati sed quas
          consequatur fugiat quaerat nisi. Maxime dolore veniam non quisquam,
          dicta minima labore eligendi ipsum accusantium mollitia porro commodi
          ipsa qui doloremque natus quam, enim necessitatibus dolores ducimus
          ullam? Consectetur vel eveniet porro cum fugit animi quisquam
          nesciunt. Expedita fugiat voluptate, sed eligendi, porro quas corrupti
          ducimus asperiores, sint in reprehenderit temporibus iusto eius.
          Praesentium illo error hic cumque debitis explicabo deleniti labore
          repellat, ducimus eaque sint, ipsam iure veniam voluptates aut vero
          quae, quas at? Eius animi libero esse error unde ea numquam labore
          nulla deserunt sequi rerum quis, tempore debitis adipisci similique
          natus ipsam illum, maxime, quam voluptatibus quibusdam placeat ducimus
          repellat! Totam eligendi itaque saepe perferendis blanditiis nihil?
          Obcaecati corporis veritatis est amet nihil maxime quis repellat
          recusandae, quo a excepturi veniam optio beatae fugit, eligendi
          dolores modi perferendis odio exercitationem. Deleniti nemo sapiente
          ipsum accusamus voluptates fuga optio nam inventore facere expedita,
          recusandae dolorum, nobis earum explicabo facilis eveniet cupiditate
          ducimus quae! Fugiat ex mollitia sint eveniet dolorem voluptas labore
          molestiae architecto accusamus illo natus, ab, deleniti distinctio
          modi expedita fuga? Nostrum suscipit amet alias rem, minima eos,
          exercitationem ad dolores at itaque neque laborum harum iste sapiente
          doloribus, cumque vero asperiores sunt quo aperiam maiores mollitia!
          Adipisci dicta soluta autem labore maxime, est praesentium ducimus
          necessitatibus magni eius possimus porro non ipsa deserunt modi ullam
          consequatur laboriosam molestias optio magnam. Delectus sit deleniti,
          placeat neque beatae numquam quidem saepe aspernatur itaque labore
          porro ex voluptas et voluptate nemo, eum fugit error voluptatibus!
          Laudantium quibusdam cumque ea et voluptates, magni similique debitis
          recusandae sequi natus unde architecto sint reprehenderit, delectus
          exercitationem, ex incidunt! Laborum ex maiores eum illo odit ullam
          hic vel aliquid. Nostrum ea doloremque eligendi omnis nihil.
          Perferendis reprehenderit dolor voluptatem corporis repellat doloribus
          atque molestiae mollitia! Nemo necessitatibus porro sunt inventore nam
          impedit fuga consequatur labore aliquam fugit sapiente hic, doloribus
          at perspiciatis libero dicta. Architecto quod laudantium veniam
          facilis quae vero, repellat quam laborum blanditiis odio esse porro
          quis corporis, deserunt nam animi eveniet, nobis perferendis? Fugit
          deleniti atque ex perferendis veritatis cupiditate rem ea distinctio
          dolores officiis earum omnis delectus, temporibus aperiam quo labore
          vel reiciendis pariatur harum illo animi? Illo non eveniet aspernatur
          facilis, alias, enim suscipit numquam ullam deleniti nihil, fuga
          ratione nobis id sequi recusandae repellendus molestiae!
          Necessitatibus alias maxime nam. Officia, ab et voluptas possimus
          consectetur facere quibusdam architecto, porro ipsa magni voluptatum
          placeat rem praesentium minima ipsam nemo laudantium! Illo aliquid
          odit quo reprehenderit molestiae minus culpa, voluptas numquam dolores
          incidunt sunt soluta dolorum repudiandae eaque corporis fugit pariatur
          aliquam labore tempore in, aspernatur laboriosam, similique unde?
          Perspiciatis, animi! Ad quae neque in omnis vero nostrum consequuntur,
          maxime, dolore nam fugiat, fuga ut repudiandae facilis facere
          quibusdam blanditiis cumque totam ipsa pariatur? Libero, repudiandae
          ducimus error ad delectus eligendi laboriosam voluptates unde, tempora
          incidunt beatae qui totam iure nam earum molestias vitae expedita!
          Esse iste officiis ducimus, ex quisquam modi reiciendis impedit iusto
          accusantium tempora adipisci temporibus cumque, repudiandae laboriosam
          laudantium facere quas praesentium fugiat enim molestiae. Laudantium
          nam velit tempora dignissimos illum delectus at, ut laboriosam, iusto
          nulla quo, excepturi culpa consequuntur rem inventore dolorem corrupti
          harum!{' '}
        </div>
      </AdminStructure.Main>
    </AdminStructure>
  ),
  scrolling: <AdminStructure header={longContent} nav={longContent} />,
  theme: (
    <AdminStructure
      header={exampleHeader}
      nav={exampleNav}
      theme={exampleTheme}
    >
      <AdminStructure.Main header='Main'>
        <AdminStructure.Drawer>
          <p>I am a drawer</p>
        </AdminStructure.Drawer>
      </AdminStructure.Main>
    </AdminStructure>
  ),
};
