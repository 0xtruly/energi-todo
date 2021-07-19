import React, { useState, useEffect, useMemo, useCallback } from 'react';
import styled from 'styled-components';
import tw from 'twin.macro';
import Select, { components, OptionTypeBase, ActionMeta } from "react-select";
import TypedLocalStore from 'typed-local-store';

import TodoList from './TodoList';
import Nav from '../components/topbar';
import Sidebar from '../components/sidebar/Sidebar';
import Icons from '../assets/icons';
import MenuItem from '../components/sidebar/MenuItem';

interface Options {
  value: string;
  label: string;
  icon: string;
}

interface Todos {
  id: string,
  text: string,
  completed: boolean,
}

interface Category {
  id: string,
  icon: string,
  category: string,
  todos: Todos[],
  onClick: () => void,
  handleDelete: () => void,
}

const options: Options[] = [
  { value: "Home", label: "Home", icon: "home" },
  { value: "Office", label: "Office", icon: "office" },
  { value: "Academic", label: "Academic", icon: "school" },
  { value: "Finance", label: "Finance", icon: "money" },
  { value: "Fun", label: "Fun", icon: "smile" },
];

const { Option } = components;

const OptionIcon = (props: any) => (
  <Option {...props}>
    <div className="flex flex-row items-center">
    <Icons name={props.data.icon} className="h-4 w-4 mr-2" />
    {props.data.label}
    </div>
  </Option>
);

const Main = () => {
  const typedStorage = useMemo(() => new TypedLocalStore<Category | any>(), []);
  const [selected, setSelected] = useState({value: "", label: "", icon: "" });
  const [category, setCategory] = useState('');
  const [task, setTask] = useState('');
  const [categories, setCategories] = useState<Array<Category> | any>([]);
  const [activeMenu, setActiveMenu] = useState<string>('');
  const [taskList, setTaskList] = useState<Array<Todos> | any>([]);

  const handleSelect = (option: OptionTypeBase, meta: ActionMeta<any>): void => { 
    if (option === null) {
      setSelected({value: "", label: "", icon: ""})
    }
    setSelected({value: option.value, label: option.label, icon: option.icon})
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>): void => {
    setCategory(e.target.value);
  };

  const handleTaskChange = (e: React.ChangeEvent<HTMLInputElement>): void => {
    setTask(e.target.value);
  };

// Fetch task(s) by category
  const handleFetchTodos = useCallback(
    () => {
      const id = activeMenu;
      let newCategories = typedStorage.getItem('categories');
      newCategories = JSON.parse(newCategories);
      const todo = (newCategories && newCategories.filter((category: Category) => category.id === id).map((category: Category) => category.todos)[0]) || [];
      setTaskList(todo);
    },
    [activeMenu, typedStorage],
  );

// Fetch categories
  const handleFetchCategories = useCallback(
    () => {
      let newCategories = typedStorage.getItem('categories');
      newCategories = JSON.parse(newCategories);
      if (newCategories !== undefined) {
        setCategories(newCategories);
        setActiveMenu(newCategories[0].id);
      }
    },
    [typedStorage],
  );

  // Add a new category
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const payload = {
      id: '_' + Math.random().toString(36).substr(2, 14),
      category,
      icon: selected.icon,
      todos: [],
    };
    const isExist = typedStorage.getItem('categories');
    if (!isExist) {
      typedStorage.setItem('categories', JSON.stringify([payload]));
      let categories = typedStorage.getItem('categories');
      categories = JSON.parse(categories);
      setCategories(categories);
    } else { 
      const categories: Array<any> = JSON.parse(isExist);
      categories.push(payload);
      typedStorage.setItem('categories', JSON.stringify(categories));
      let newCategories = typedStorage.getItem('categories');
      newCategories = JSON.parse(newCategories);
      setCategories(newCategories);
    }
    setSelected({value: "", label: "", icon: "" });
    setCategory('');
  }

  const handleCreateTask = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const payload = {
      id: '_' + Math.random().toString(36).substr(2, 14),
      text: task,
      completed: false,
    };
    let newCategories = JSON.parse(typedStorage.getItem('categories'));
    newCategories = newCategories.map((category: Category) => {
      if (category.id === activeMenu) {
        category.todos.push({...payload});
      }
      return category;
    }); 
    typedStorage.setItem('categories', JSON.stringify(newCategories));
    setTimeout(() => {
      handleFetchTodos();
    }, 1500);
    setTask('');
  };

  const handleDeleteCategory = (id: string) => {
    let newCategories = JSON.parse(typedStorage.getItem('categories'));
    newCategories = newCategories.filter((category: Category) => category.id !== id);
    typedStorage.setItem('categories', JSON.stringify(newCategories));
    setTimeout(() => {
      handleFetchCategories();
    }, 1500);
  }

  const handleDeleteTask = (id: string) => {
    let newCategories = JSON.parse(typedStorage.getItem('categories'));
    newCategories = newCategories.map((category: Category) => {
      if (category.id === activeMenu) {
        category.todos = category.todos.filter((todo: Todos) => {
          return todo.id !== id;
        });
      }
      return category;
    });
    typedStorage.setItem('categories', JSON.stringify(newCategories));
    setTimeout(() => {
      handleFetchTodos();
    }, 1500);
  };

  const handleTaskComplete = (id: string) => {
    let newCategories = JSON.parse(typedStorage.getItem('categories'));
    newCategories = newCategories.map((category: Category) => {
      if (category.id === activeMenu) {
        category.todos = category.todos.filter((todo: Todos) => {
          if (todo.id === id) {
            todo.completed = !todo.completed;
          }
          return todo;
        });
      }
      return category;
    });
    typedStorage.setItem('categories', JSON.stringify(newCategories));
    setTimeout(() => {
      handleFetchTodos();
    }, 1500);
  }

  const handleClick = (id: string) => {
      setActiveMenu(id);
  };

  useEffect(() => {
    handleFetchTodos();
  }, [handleFetchTodos]);

  useEffect(() => {
    handleFetchCategories();
  }, [handleFetchCategories])
  
  // Category menu
  const renderMenu = (categories: Category[]) => {
    if (categories.length === 0) {
      return (
        <div className="text-center text-lg">No categories</div>
      )
     }
    return categories && categories.map((category) => {
      return (
        <MenuItem
          key={category.id}
          id ={category.id}
          onClick={handleClick}
          iconName={category.icon}
          text={category.category}
          activeMenu={activeMenu}
          handleDelete={handleDeleteCategory}
        />
      );
    });
  }

  const renderTodolist = (taskList: Todos[]) => {
    if (taskList.length === 0) { 
      return (
        <>
          <div className="text-center text-xl mb-8 font-medium">No Task. Create a new Task</div>
        </>
      )
    }
    return taskList.map((task) => {
      return (
        <TodoList
          key={task.id}
          id={task.id}
          text={task.text}
          completed={task.completed}
          categoryId={activeMenu}
          handleDelete={handleDeleteTask}
          handleCheck={handleTaskComplete}
        />
      );
    })
  }
    return (
        <Container>
            <Sidebar>
              {renderMenu(categories)}
            </Sidebar>
            <MainSection>
                <MainContent>
                <Nav>
                   <Form onSubmit={handleSubmit}>
                      <FieldContainer>
                         <input
                             type="text"
                             name="search"
                             id="search"
                             placeholder="Category"
                             value={category}
                             onChange={handleChange}
                             required
                         />
                         <Select
                            className="border-none focus:outline-none flex flex-col flex-1 w-full ml-2 bg-white text-sm text-black rounded-sm"
                            name="search"
                            id="search"
                            placeholder="Select icon"
                            options={options}
                            components={{ Option: OptionIcon }}
                            onChange={handleSelect}
                         />
                      </FieldContainer>
                      <Button type="submit">
                        Add Category
                      </Button>
                   </Form>
                </Nav>
                <Content>
                  <div className="mt-24 w-full">
                    <h1 className="text-2xl font-semibold text-gray-700 text-center">
                      Todo List
                    </h1>
                  </div>
                  <Form onSubmit={handleCreateTask} className="justify-center my-4">
                      <FieldContainer className="w-3/5">
                         <input
                             type="text"
                             name="task"
                             id="task"
                             placeholder="Enter new task"
                             value={task}
                             onChange={handleTaskChange}
                             required
                         />
                      </FieldContainer>
                      <Button type="submit">
                        Add Task
                      </Button>
                  </Form>
                  {renderTodolist(taskList)}
                </Content>
                </MainContent>
            </MainSection>
        </Container>
    )
}
export default Main;

const Container = styled.div`
    ${tw`flex flex-row w-full h-screen`}
`;

const FieldContainer = styled.div`
  ${tw`items-center flex w-2/6`}
  input {
    ${tw`border-none focus:outline-none flex-1 block w-full ml-2 bg-white text-sm text-black rounded-sm shadow p-2`}
  }
  select {
    ${tw`border-none focus:outline-none flex-1 block w-full ml-2 bg-white text-sm text-black rounded-sm shadow p-2`}
  }
`;

const MainSection = styled.div`
  ${tw`flex w-full`}
`;

const MainContent = styled.div`
  ${tw`w-full`}
  &::-webkit-scrollbar {
    width: 1px;
  }
  &::-webkit-scrollbar-track {
    box-shadow: inset 0 0 5px red;
    border-radius: 5px;
  }
  &::-webkit-scrollbar-thumb {
    box-shadow: inset 0 0 5px white;
    border-radius: 5px;
  }
`;

const Button = styled.button`
  ${tw`rounded-md text-white text-sm w-32 ml-4 p-1.5 bg-blue-400`};
`;

const Form = styled.form`
  ${tw`flex w-full`};
`;

const Content = styled.div`
  ${tw`flex flex-col w-full text-white py-2 h-full bg-gray-300`};
`;