import { Connect } from 'dob-react';
import * as React from 'react';
import * as ReactDOM from 'react-dom';
import Editor from 'gaea-editor';
import Icon from 'gaea-editor/src/components/icon/src';
import * as Styled from './index.style';
import { Props, State } from './index.type';
import PageStore from './store';
import PageAction from './action';

@Connect
class Page extends React.Component<Props, State> {
    public static defaultProps = new Props();
    public state = new State();

    public render(){
        return (
            <Styled.Container>
                <Styled.Title>
                <Styled.TitleLeftContainer>
                    <div>{this.props.stores.ApplicationStore.setLocale('页面配置', 'Page configuration')}</div>
                    <Styled.CloseContainer onClick={this.handleCloseLeftBar}>
                    <Icon type="close" size={15} />
                    </Styled.CloseContainer>
                </Styled.TitleLeftContainer>
                <Styled.TitleRightContainer>
                    <Styled.AddIcon>
                    <Icon type="addFolder" />
                    </Styled.AddIcon>
                    <Styled.AddIcon onClick={this.handleAddPage}>
                    <Icon type="addFile" size={17}  />
                    </Styled.AddIcon>
                </Styled.TitleRightContainer>
                </Styled.Title>
               

            </Styled.Container>
        );
    }
    private handleCloseLeftBar = () => {
        this.props.actions.PageAction.RemoveCreatingPage();
        this.props.actions.ApplicationAction.setLeftTool(null);
        this.props.actions.ApplicationAction.setRightTool(null);
      };
      private handleAddPage=()=>{
        this.props.actions.PageAction.RemoveCreatingPage();
        this.props.actions.PageAction.createNewPage(false);
        this.props.actions.ApplicationAction.setRightTool('pageAddPage');
      }
}

export default {
    position: 'toolContainerLeftPage',
    class: Page,
    actions: {
      PageAction
    },
    stores: {
      PageStore
    }
  };